"use server";

import { createGame } from "@/entities/game";
import { getCurrentUser } from "@/entities/user";
import { left, right } from "@/shared/lib/either";
import { redirect } from "next/navigation";

export const createGameAction = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return left("user-not-found" as const);
  }

  const gameResult = await createGame(user);

  if (gameResult.type == "right") redirect(`/game/${gameResult.value.id}`);

  return gameResult;
};
