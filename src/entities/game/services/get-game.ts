import { gameRepository } from "../repositories/game";

export async function getGame(gameId: string) {
  return await gameRepository.getGame({ id: gameId });
}
