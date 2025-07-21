import { GameEntry } from "@/entities/game/domain";
import { GameId } from "@/kernel/ids";
import { EventsChannel } from "@/shared/lib/events-chanel";

type GameCreated = {
  type: "game-created";
};

type GameChanged = {
  type: "game-changed";
  data: GameEntry;
};

type GameEvent = GameChanged | GameCreated;

class GameEventService {
  private eventsChannel = new EventsChannel("game");

  async addGameChanged(gameId: GameId,listener: (event: GameChanged) => void) {
    return this.eventsChannel.consume(gameId, (data) => {
      listener(data as GameChanged);
    });
  }

  async addGameCreated(listener: (event: GameCreated) => void) {
    return this.eventsChannel.consume("game-created", (data) => {
      listener(data as GameCreated);
    });
  }

  emit(event: GameEvent) {
    if (event.type === "game-changed") {
      return this.eventsChannel.emit(event.data.id, event);
    }

    if (event.type === "game-created") {
      return this.eventsChannel.emit("game-created", event);
    }
  }
}

export const gameEvents = new GameEventService();
