import { getGame } from "@/entities/game/server";
import { redirect } from "next/navigation";
import { GameClient } from "./game-client";
import { routes } from "@/kernel/routes";

export async function Game({ gameId }: { gameId: string }) {
  const game = await getGame(gameId);

  console.log("Component Game (server)", gameId, game);

  if (!game) {
    redirect(routes.home());
  }

  return <GameClient gameId={gameId} defaultStateGame={game} />;
}
