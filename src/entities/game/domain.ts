export type GameEntry = GameIdleEntry | GameInProgressEntry | GameOverEntry | GameOverDrawEntry

export type GameIdleEntry = {
  id: string;
  creator: Player;
  type: "idle";
};

export type GameInProgressEntry = {
  id: string;
  players: Player[];
  field: Field
  type: "inProgress";
};

export type GameOverEntry = {
  id: string;
  players: Player[];
  field: Field[]
  type: "gameOver";
  winner: Player
};

export type GameOverDrawEntry = {
    id: string;
    players: Player[];
    field: Field[]
    type: "gameOverDraw";
    winner: Player
  };

export type Player = {
  id: string;
  login: string;
  rating: number;
};

export type Field = Cell[];
export type Cell = GameSymbol | null;
export type GameSymbol= string
