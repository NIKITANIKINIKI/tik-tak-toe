import { getIdleGames } from "@/entities/game";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <div className=" grid grid-cols-2 gap-4">
      {games.map((game) => (
        <Card key={game.id}>
          <CardTitle className="px-6" >Игрок: {game.creator.login}</CardTitle>
          <CardContent>Рейтинг: {game.creator.rating}</CardContent>
        </Card>
      ))}
    </div>
  );
}
