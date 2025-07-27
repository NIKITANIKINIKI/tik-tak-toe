"use server";
import { GameEntry, Player } from "@/entities/game/domain";
import { stepsGame } from "@/entities/game/server";

export async function gameStepAction({
  game,
  index,
  currentUser,
}: {
  game: GameEntry;
  index: number;
  currentUser: Player;
}) {
  const stepsRes = await stepsGame(game.id, index, currentUser);

  return stepsRes;
}
