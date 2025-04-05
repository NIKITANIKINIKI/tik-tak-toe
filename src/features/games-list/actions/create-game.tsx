'use server'
import { createGame } from "@/entities/game";
import { prisma } from "@/shared/lib/db";
import { left, right } from "@/shared/lib/either";

export const createGameAction = async () => {
  const user = await prisma.user.findFirst({where: {
    id:'110011'
  }});

  if (!user) {
    return left("user-not-found" as const);
  }

  const gameResult = await createGame(user);

  return right(gameResult);
};
