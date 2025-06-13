import { getCurrentUser } from "@/entities/user";
import { NextRequest } from "next/server";
import { getGame } from "../server";
import { sseStream } from "@/shared/lib/sse/server";

export async function getGameStream(
  req: NextRequest,
  params: Promise<{ id: string }>
) {
  const { id } = await params;
  const user = await getCurrentUser();
  const game = await getGame(id);

  if (!game || !user) {
    return new Response("Game not found", { status: 404 });
  }

  const { addClose, response, write } = sseStream(req);

//   const interval = setInterval(() => write(game));

//   addClose(() => clearInterval(interval));

  return response;
}
