import { right } from "./../../shared/lib/either";
import { GameId, UserId } from "@/kernel/ids";
import { gameRepository } from "./repositories/game";
import { left } from "@/shared/lib/either";

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
export type Draw = "draw";

export const SymbolForGame = {
  X: "X",
  O: "O",
} as const;

export function getCurrentSymbol(game: GameEntry) {
  const activeSteps = game.field.filter((el) => el !== null).length;

  return activeSteps % 2 ? SymbolForGame.X : SymbolForGame.O;
}

export function getWinnerSymbol(
  winner: Player,
  game: GameInProgressEntry | GameOverEntry | GameOverDrawEntry
) {
  const index = game.players.findIndex((player) => player.id === winner.id);

  return {
    0: SymbolForGame.O,
    1: SymbolForGame.X,
  }[index];
}

export function checkWinner(field: Cell[], symbol: GameSymbol): boolean {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) =>
    pattern.every((index) => field[index] == symbol)
  );
}

export function getGameState(field: Cell[]): GameSymbol | Draw | null {
  if (checkWinner(field, SymbolForGame.O)) return SymbolForGame.O;
  if (checkWinner(field, SymbolForGame.X)) return SymbolForGame.X;

  if (field.every((el) => el !== null)) return "draw";

  return null;
}

export function stepGame({
  game,
  currentIndex,
  player,
}: {
  game: GameEntry;
  currentIndex: number;
  player: Player;
}) {
  console.log("stepGame called with:", {
    gameId: game.id,
    currentIndex,
    playerId: player.id,
    gameStatus: game.status,
    currentField: game.field,
  });

  if (game.status !== "inProgress") {
    console.log("Game already finished");
    return left("game-already-finished");
  }

  const currentSymbol = getCurrentSymbol(game);
  console.log("Current symbol to play:", currentSymbol);

  if (
    game.players[0].login == player.login &&
    currentSymbol != SymbolForGame.O
  ) {
    console.log("It's currently player O's move, but player 0 tried to play");
    return left("currently-player-O-move");
  }

  if (
    game.players[1].login == player.login &&
    currentSymbol != SymbolForGame.X
  ) {
    console.log("It's currently player X's move, but player 1 tried to play");
    return left("currently-player-X-move");
  }

  if (game.field[currentIndex] !== null) {
    console.log("Cell is already occupied at index:", currentIndex);
    return left("this-cell-is-occupied");
  }

  const newField = game.field.map((el, index) =>
    index === currentIndex ? currentSymbol : el
  );
  console.log("New field after move:", newField);

  const gameSymbol = getGameState(newField);
  console.log("Game state after move:", gameSymbol);

  let updatedGame: GameEntry = game;

  switch (gameSymbol) {
    case "draw":
      updatedGame = {
        ...game,
        field: newField,
        status: "gameOverDraw",
      };
      console.log("Game ended in a draw");
      break;

    case SymbolForGame.X:
      updatedGame = {
        ...game,
        field: newField,
        status: "gameOver",
        players: game.players,
        winner: game.players[1],
      };
      console.log("Player X won:", updatedGame.winner);
      break;

    case SymbolForGame.O:
      updatedGame = {
        ...game,
        field: newField,
        status: "gameOver",
        players: game.players,
        winner: game.players[0],
      };
      console.log("Player O won:", updatedGame.winner);
      break;

    default:
      updatedGame = {
        ...game,
        field: newField,
      };
      console.log("Game continues, updated field set");
      break;
  }

  console.log("Returning updated game:", updatedGame);

  return right(updatedGame);
}
