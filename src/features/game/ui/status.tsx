import {
  GameEntry,
  getCurrentSymbol,
  getWinnerSymbol,
} from "@/entities/game/domain";

export function Status({ game }: { game: GameEntry }) {
  switch (game.status) {
    case "idle":
      return <div>Searching for an opponent...</div>;
    case "inProgress":
      const currentSymbol = getCurrentSymbol(game);
      return (
        <div>Now the player with - {currentSymbol} - is making a move</div>
      );
    case "gameOverDraw":
      return <div> It's a draw!</div>;
    case "gameOver":
      const winnerSymbol = getWinnerSymbol(game.winner, game);
      return <div>Winner: {winnerSymbol}</div>;
  }
}
