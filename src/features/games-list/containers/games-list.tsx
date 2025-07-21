import { Layout } from "../ui/layout";
import { GameCard } from "../ui/game-card";
import { CreateButton } from "./create-button";
import { getIdleGames } from "@/entities/game/server";

export async function GamesList() {
  const games = await getIdleGames();

  return (
    <Layout
    label='Игры '
    actions={<CreateButton/>}
    >
      {games.map((game) => (
        <GameCard
          key={game.id}
          gameId={game.id}
          login={game.creator.login}
          rating={game.creator.rating}
        />
      ))}
    </Layout>
  );
}
