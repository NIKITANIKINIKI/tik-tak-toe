"use server";

import { createGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user";
import { left, right } from "@/shared/lib/either";
import { redirect } from "next/navigation";

export const createGameAction = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return left("user-not-found" as const);
  }

  console.log('user - created game action', user)

  const game = await createGame(user);

  if (game.type == "right") redirect(`/game/${game.value.id}`);

  return game;
};
