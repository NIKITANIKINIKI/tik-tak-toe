import { Game } from "@/features/game/server";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="w-[400px] mx-auto mt-5">
      <Game gameId={id} />
    </main>
  );
}
