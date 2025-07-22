import { right } from "./../../../shared/lib/either";
import { left } from "@/shared/lib/either";
import { Player } from "../domain";
import { gameRepository } from "../repositories/game";
import { gameEvents } from "@/features/game/server";

export async function startGame(gameId: string, player: Player) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found" as const);
  }

  if (game.status !== "idle") {
    return left("game-status-not-idle" as const);
  }

  if (game.creator.id === player.id) {
    return left("creator-can-not-start-game" as const);
  }

  const newGame = await gameRepository.startGame(gameId, player);

  console.log("[startGame] Game started successfully:", newGame);

  console.log("[startGame] Emitting game-changed event...");

  await gameEvents.emit({
    type: "game-changed",
    data: newGame,
  });
  console.log("[startGame] Event emitted.");

  return right(newGame);
}
