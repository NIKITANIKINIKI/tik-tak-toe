import { getGame } from "@/entities/game/server";
import { GameLayout } from "../ui/layout";
import { Status } from "../ui/status";
import { redirect } from "next/navigation";
import { Fields } from "../ui/fields";
import { Players } from "../ui/players";

export async function Game({ gameId }: { gameId: string }) {
  const game = await getGame(gameId);

  if (!game) {
    redirect("/");
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

  return (
    <GameLayout
      players={<Players game={game} />}
      status={<Status game={game} />}
      fields={<Fields fields={game.field} />}
    />
  );
}
