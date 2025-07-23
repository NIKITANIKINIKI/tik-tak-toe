import {
  GameIdleEntry,
  GameInProgressEntry,
  GameOverDrawEntry,
  GameOverEntry,
  Player,
} from "./../domain";
import { prisma } from "@/shared/lib/db";
import { GameEntry } from "../domain";
import { Game, Prisma, User } from "@prisma/client";
import { z } from "zod";
import { removePassword } from "@/shared/lib/password";

const gameInclude = {
  winner: { include: { user: true } },
  players: { include: { user: true } },
};

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntry[]> {
  const games = await prisma.game.findMany({
    where,
    include: {
      winner: true,
      players: true,
    },
  });

  return games.map(dbGameToGameEntry);
}

async function createGame(game: GameIdleEntry): Promise<GameEntry> {
  const createdGame = await prisma.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: game.field,
      players: {
        connect: {
          id: game.creator.id,
        },
      },
      gameOverAt: "",
    },
    include: {
      players: true,
      winner: true,
    },
  });

  return dbGameToGameEntry(createdGame);
}

async function getGame(where?: Prisma.GameWhereInput) {
  const game = await prisma.game.findFirst({
    where,
    include: {
      players: true,
      winner: true,
    },
  });

  if (game) {
    return dbGameToGameEntry(game);
  }

  return undefined;
}

async function saveGame(
  game: GameInProgressEntry | GameOverEntry | GameOverDrawEntry
) {
  const winnerId = game.status === "gameOver" ? game.winner.id : undefined;

  const updateGame = await prisma.game.update({
    where: { id: game.id },
    data: {
      winnerId: winnerId,
      status: game.status,
      field: game.field,
    },
    include: {
      players: true,
      winner: true
    },
  });

  return dbGameToGameEntry(updateGame);
}

async function startGame(gameId: string, player: Player) {
  const game = await prisma.game.update({
    where: { id: gameId },
    data: {
      players: {
        connect: {
          id: player.id,
        },
      },
      status: "inProgress",
    },
    include: {
      players: true,
    },
  });

  return dbGameToGameEntry(game);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntry(
  game: Game & {
    players: User[];
    winner?: User | null;
  }
): GameEntry {
  const players = game.players.map(removePassword);
  const [creator] = players;
  switch (game.status) {
    case "idle": {
      return {
        id: game.id,
        creator: creator,
        status: game.status,
        field: fieldSchema.parse(game.field),
      } satisfies GameIdleEntry;
    }
    case "inProgress":
    case "gameOverDraw": {
      return {
        id: game.id,
        players: game.players.map(removePassword),
        status: game.status,
        field: fieldSchema.parse(game.field),
      };
    }

    case "gameOver": {
      if (!game.winner) {
        throw new Error("winner should be in game over");
      }

      return {
        id: game.id,
        players: game.players.map(removePassword),
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: removePassword(game.winner),
      } satisfies GameOverEntry;
    }
  }
}

export const gameRepository = {
  gamesList,
  createGame,
  getGame,
  startGame,
  saveGame,
};
