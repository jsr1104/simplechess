import { Chess } from "chess.js";
import { useState } from "react";
import type { Move, Square } from "chess.js";

export function useChess() {
  const [game, setGame] = useState(new Chess());
  const [selected, setSelected] = useState<Square | null>(null);
  const [legalMoves, setLegalMoves] = useState<Move[]>([]);

  function selectSquare(square: Square) {
    // If you're clicking the same square again, unselect it
    if (selected === square) {
      setSelected(null);
      setLegalMoves([]);
      return;
    }

    // Get all legal moves from this square (verbose = includes from/to/etc.)
    const moves = game.moves({ square, verbose: true });

    // If there are legal moves, update selection
    if (moves.length > 0) {
      setSelected(square);
      setLegalMoves(moves);
    }
  }

  function makeMove(to: Square) {
    if (!selected) return;

    const move = game.move({ from: selected, to });

    if (move) {
      // Update the game state by cloning it
      setGame(new Chess(game.fen()));
    }

    // Clear selection and move highlights
    setSelected(null);
    setLegalMoves([]);
  }

  return {
    game,
    selected,
    legalMoves,
    selectSquare,
    makeMove,
  };
}
