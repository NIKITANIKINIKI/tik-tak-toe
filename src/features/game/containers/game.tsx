import { getGame } from "@/entities/game/server";
import { redirect } from "next/navigation";
import { GameClient } from "./game-client";
import { routes } from "@/kernel/routes";

export async function Game({ gameId }: { gameId: string }) {
  const game = await getGame(gameId);

  if (!game) {
    redirect(routes.home());
  }

  //   const game={
  //     id: '1000',
  //     creator: {
  //         id: '10000',
  //         login: 'user',
  //         rating: 1000
  //     },
  //     players:[{
  //         id: '10000',
  //         login: 'user1',
  //         rating: 1000
  //     }, {
  //         id: '10001',
  //         login: 'user2',
  //         rating: 1000
  //     }],
  //     status: 'inProgress',
  //     field: ['O', 'X', null, null, null, null, null, null, null]
  //   }

  return <GameClient defaultStateGame={game} />;
}
