import { GameEntry } from "@/entities/game/domain";

export function Players({ game }: { game: GameEntry }) {
  const firstPlayer = game.status == "idle" ? game.creator : game.players[0];
  const secondPlayer = game.status == "idle" ? undefined : game.players[1];

  return (
    <div className="flex justify-center gap-2 text-[20px]">
      <div>
        X - {firstPlayer.login}: {firstPlayer.rating}
      </div>
      <div>
        {secondPlayer?.login && (
          <>
            | O - {secondPlayer.login}:{secondPlayer.rating}
          </>
        )}
      </div>
    </div>
  );
}
