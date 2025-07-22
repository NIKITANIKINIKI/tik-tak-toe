"use client";

import { GameEntry } from "@/entities/game/domain";
import { GameLayout } from "../ui/layout";
import { Players } from "../ui/players";
import { Status } from "../ui/status";
import { Fields } from "../ui/fields";
import { useEventSource } from "@/shared/lib/sse/client";
import { redirect } from "next/navigation";
import { routes } from "@/kernel/routes";
import { Loader } from "@/shared/components/loader";
import { GameId } from "@/kernel/ids";

export function GameClient({
  defaultStateGame,
  gameId,
}: {
  defaultStateGame: GameEntry;
  gameId: GameId;
}) {
  const {
    data: game = defaultStateGame,
    isLoading,
    isError,
  } = useEventSource<GameEntry>(`/game/${gameId}/stream`);

  if (isError) {
    redirect(routes.home());
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <GameLayout
          players={<Players game={game} />}
          status={<Status game={game} />}
          fields={
            <Fields fields={game ? game.field : defaultStateGame.field} />
          }
        />
      )}
    </>
  );
}
