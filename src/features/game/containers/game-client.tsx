"use client";

import { GameEntry } from "@/entities/game/domain";
import { GameLayout } from "../ui/layout";
import { Players } from "../ui/players";
import { Status } from "../ui/status";
import { Fields } from "../ui/fields";
import { useEventSource } from "@/shared/lib/sse/client";

export function GameClient({ defaultStateGame }: { defaultStateGame: GameEntry }) {
  const { data, isLoading, isError } = useEventSource("/game/stream");

  return (
    <GameLayout
      players={<Players game={defaultStateGame} />}
      status={<Status game={defaultStateGame} />}
      fields={<Fields fields={defaultStateGame.field} />}
    />
  );
}
