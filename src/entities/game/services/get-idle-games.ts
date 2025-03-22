import { GameIdleEntry } from "../domain";
import { gameRepository } from "../repositories/game";

export async function getIdleGames(): Promise<GameIdleEntry[]> {
  const games = await gameRepository.gamesList({
    status: "idle",
  });

  return games as GameIdleEntry[];
}
