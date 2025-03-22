import { GamesList } from "@/features/games-list/server";
import { prisma } from "@/shared/lib/db";

export default async function Home() {
  const games = await prisma.game.findMany();

  console.log(games);

  return (
    <div className="flex flex-col gap-4  p-10">
      <h1 className="text-4xl">Игры</h1>
      <GamesList />
    </div>
  );
}
