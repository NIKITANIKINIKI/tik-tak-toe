import { getGame } from "@/entities/game/server";
import { redirect } from "next/navigation";
import { GameClient } from "./game-client";
import { routes } from "@/kernel/routes";
import { getCurrentUser } from "@/entities/user";
import { left } from "@/shared/lib/either";

export async function Game({ gameId }: { gameId: string }) {
  const game = await getGame(gameId);

  if (!game) {
    redirect(routes.home());
  }

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return left("current-user-not-found");
  }

  return <GameClient defaultStateGame={game}  currentUser={currentUser}/>;
}
