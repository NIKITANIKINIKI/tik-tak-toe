import { GameId, UserId } from "@/kernel/ids";

export type GameEntry =
  | GameIdleEntry
  | GameInProgressEntry
  | GameOverEntry
  | GameOverDrawEntry;

export type GameIdleEntry = {
  id: GameId;
  creator: Player;
  field: Field;
  status: "idle";
};

export type GameInProgressEntry = {
  id: GameId;
  players: Player[];
  field: Field;
  status: "inProgress";
};

export type GameOverEntry = {
  id: GameId;
  players: Player[];
  field: Field;
  status: "gameOver";
  winner: Player;
};

export type GameOverDrawEntry = {
  id: GameId;
  players: Player[];
  field: Field;
  status: "gameOverDraw";
};

export type Player = {
  id: UserId;
  login: string;
  rating: number;
};

export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;
