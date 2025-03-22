export type GameEntry =
  | GameIdleEntry
  | GameInProgressEntry
  | GameOverEntry
  | GameOverDrawEntry;

export type GameIdleEntry = {
  id: string;
  creator: Player;
  status: "idle";
};

export type GameInProgressEntry = {
  id: string;
  players: Player[];
  field: Field;
  status: "inProgress";
};

export type GameOverEntry = {
  id: string;
  players: Player[];
  field: Field;
  status: "gameOver";
  winner: Player;
};

export type GameOverDrawEntry = {
  id: string;
  players: Player[];
  field: Field;
  status: "gameOverDraw";
};

export type Player = {
  id: string;
  login: string;
  rating: number;
};

export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol = string;
