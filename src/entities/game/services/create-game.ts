import { left, right } from "@/shared/lib/either";
import { GameIdleEntry, Player } from "../domain";
import { gameRepository } from "../repositories/game";
import cuid from "cuid";
import { gameEvents } from "@/features/game/server";

export async function createGame(player: Player) {
  console.log("[createGame] Called with player:", player);
  const playerGames = await gameRepository.gamesList({
    players: { some: { id: player.id } },
    status: "idle",
  });

  const isGameInIdleStatus = playerGames.some(
    (game) => game.status === "idle" && game.creator.id === player.id
  );

  if (isGameInIdleStatus) {
    return left("can-create-only-one-game" as const);
  }

  const game = await gameRepository.createGame({
    id: cuid(),
    creator: player,
    status: "idle",
    field: Array(9).fill(null),
  });

  console.log("[createGame] Created game:", game);

  await gameEvents.emit({
    type: "game-created",
  });

  return right(game);
}
