import { GameId } from "@/kernel/ids";
import { Player, stepGame } from "../domain";
import { gameRepository } from "../repositories/game";
import { left, right } from "@/shared/lib/either";
import { gameEvents } from "@/features/game/server";

export async function stepsGame(gameId: GameId, index: number, player: Player) {
  const game = await gameRepository.getGame({ id: gameId });

  if (!game) {
    return left("game-not-found");
  }

  const stepRes = stepGame({ game, currentIndex: index, player });

  if (stepRes.type === "left") {
    return stepRes;
  }
  
  const newGame = await gameRepository.saveGame(stepRes.value);
  console.log("Emitting event with data:", JSON.stringify(newGame));

  await gameEvents.emit({
    type: "game-changed",
    data: newGame,
  });

  return right(newGame);
}
