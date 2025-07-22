import { getCurrentUser } from "@/entities/user";
import { NextRequest } from "next/server";
import { getGame } from "../server";
import { sseStream } from "@/shared/lib/sse/server";
import { gameEvents } from "@/features/game/server";

export async function getGameStream(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getCurrentUser();
  const game = await getGame(id);

  if (!game || !user) {
    return new Response("Game not found", { status: 404 });
  }

  const { addClose, response, write } = sseStream(req);

  console.log("Initial game write:", game);
  write(game);

  addClose(
    await gameEvents.addGameChanged(game.id, (event) => {
      console.log("Game changed event received:", event);
      write(event.data);
    })
  );

  return response;
}
