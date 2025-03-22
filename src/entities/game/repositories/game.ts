import {
  GameIdleEntry,
  GameOverEntry,
} from "./../domain";
import { prisma } from "@/shared/lib/db";
import { GameEntry } from "../domain";
import { Game, Prisma, User } from "@prisma/client";
import { z } from "zod";
import { removePassword } from "@/shared/lib/password";

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

const fieldSchema = z.array(z.union([z.string(), z.null()]));

function dbGameToGameEntry(
  game: Game & {
    players: User[];
    winner?: User | null;
  }
): GameEntry {
  const players = game.players.map(removePassword);
  const [creator]=players
  switch (game.status) {
    case "idle": {
      return {
        id: game.id,
        creator: creator,
        status: game.status,
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
};
