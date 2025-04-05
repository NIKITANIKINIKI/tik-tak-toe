"use server";

import { createGame } from "@/entities/game";
import { prisma } from "@/shared/lib/db";
import { left, right } from "@/shared/lib/either";
import { redirect } from "next/navigation";

export const createGameAction = async () => {
  const user = await prisma.user.findFirst();

  if (!user) {
    return left("user-not-found" as const);
  }

  const gameResult = await createGame(user);

  console.log(gameResult)

  if (gameResult.type == "right") redirect(`/game/${gameResult.value.id}`);

  return gameResult;
};
