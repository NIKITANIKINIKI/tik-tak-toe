import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";
import { startGameAction } from "../actions/start-game";

export function GameCard({
  login,
  rating,
  gameId,
}: {
  login: string;
  rating: number;
  gameId: string;
}) {

  return (
    <Card>
      <CardTitle className="px-6">Игрок: {login}</CardTitle>
      <CardContent>Рейтинг: {rating}</CardContent>
      <form
        action={async () => {
          "use server";
          await startGameAction(gameId)
        }}
      >
        <Button variant="destructive" className="mr-5">
          Присоединится к игре
        </Button>
      </form>
    </Card>
  );
}
