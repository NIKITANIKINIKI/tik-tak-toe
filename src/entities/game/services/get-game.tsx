import { gameRepository } from "../repositories/game";

export function getGame(gameId: string) {
  return gameRepository.getGame({ id: gameId });
}
