"use server";

import { startGame } from "@/entities/game/server";
import { getCurrentUser } from "@/entities/user";
import { routes } from "@/kernel/routes";
import { left } from "@/shared/lib/either";
import { redirect } from "next/navigation";

export const startGameAction = async (gameId: string) => {
  const user = await getCurrentUser();
  const redirectUrl = `${routes.game()}/${gameId}`;

  if (!user) {
    return left("user-not-found" as const);
  }

  await startGame(gameId, user);

  redirect(redirectUrl);
};
