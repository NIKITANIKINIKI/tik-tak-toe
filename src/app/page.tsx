import { Button } from "@/shared/components/ui/button";
import { Card, CardTitle } from "@/shared/components/ui/card";
import { prisma } from "@/shared/lib/db";

export default async function Home() {
  const games = await prisma.game.findMany();

  console.log(games);

  return (
    <div className="flex items-center justify-center ">
      <Button>111111</Button>
      {games.map((game) => (
        <Card key={game.id}>
          <CardTitle>{game.name}</CardTitle>
        </Card>
      ))}
    </div>
  );
}
