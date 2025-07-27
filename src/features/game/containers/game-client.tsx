"use client";

import { GameEntry, Player } from "@/entities/game/domain";
import { GameLayout } from "../ui/layout";
import { Players } from "../ui/players";
import { Status } from "../ui/status";
import { Fields } from "../ui/fields";
import { useEventSource } from "@/shared/lib/sse/client";
import { redirect } from "next/navigation";
import { routes } from "@/kernel/routes";
import { Loader } from "@/shared/components/loader";
import { gameStepAction } from "../actions/game-step-action";

export function GameClient({
  defaultStateGame,
  currentUser
}: {
  defaultStateGame: GameEntry;
  currentUser: Player
}) {
  const {
    data: game = defaultStateGame,
    isLoading,
    isError,
  } = useEventSource<GameEntry>(`/game/${defaultStateGame.id}/stream`);

  if (isError) {
    redirect(routes.home());
  }

  const onClick = async (index: number) => {
    if (game && game.status === "inProgress") {
      const stepsRes = await gameStepAction({ game, index, currentUser });
      console.log(stepsRes);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <GameLayout
          players={<Players game={game} />}
          status={<Status game={game} />}
          fields={
            <Fields
              fields={game ? game.field : defaultStateGame.field}
              onClick={onClick}
            />
          }
        />
      )}
    </>
  );
}
