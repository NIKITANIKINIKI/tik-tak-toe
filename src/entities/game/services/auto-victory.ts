import { left, right } from "@/shared/lib/either";
import { Player } from "../domain";
import { gameRepository } from "../repositories/game";
import { gameEvents } from "@/features/game/server";

export async function autoVictory(gameId: string, player: Player) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found");
  }

  if (game.status !== "inProgress") {
    return left("game-status-not-in-progress");
  }

  const saveGame = await gameRepository.saveGame({
    ...game,
    status: "gameOver",
    winner: game.players.find((p) => p.id !== player.id)!,
  });

  await gameEvents.emit({ type: "game-changed", data: saveGame });
   console.log("[startGame] Event emitted.");

  return right(saveGame);
}
