import { Player } from "../domain";
import { gameRepository } from "../repositories/game";

export function startGame(gameId: string, player: Player ) {
  return gameRepository.startGame(gameId, player);
}
