import { GameEntry } from "@/entities/game/domain";

export function Players({ game }: { game: GameEntry }) {
  const firstPlayer = game.status == "idle" ? game.creator : game.players[0];
  const secondPlayer = game.status == "idle" ? undefined : game.players[1];

  return (
    <div className="flex justify-center gap-2 text-[20px]">
      <div>
        O - {firstPlayer.login}: {firstPlayer.rating}
      </div>
      <div>
        {secondPlayer?.login && (
          <>
            | X - {secondPlayer.login}:{secondPlayer.rating}
          </>
        )}
      </div>
    </div>
  );
}
