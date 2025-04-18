import React from 'react';
import './Board.css'; 
import { useChess } from '../hooks/useChess';
import type { Square } from "chess.js";

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export function Board() {
  const { game, selected, legalMoves, selectSquare, makeMove } = useChess();
  const board = game.board();  // 2D array of pieces
  const squares = [];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const squareColor = (row + col) % 2 === 0 ? 'light' : 'dark';
      const squareId = `${FILES[col]}${8 - row}`;
      const piece = board[row][col];
  
      const isMoveTarget = legalMoves.some(move => move.to === squareId);
      const isSelected = selected === squareId;
  
      squares.push(
        <div
          key={squareId}
          className={`square ${squareColor} ${isMoveTarget ? 'highlight' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => {
            if (isMoveTarget) {
              makeMove(squareId as Square);
            } else {
              selectSquare(squareId as Square);
            }
          }}
        >
          {piece ? renderPiece(piece) : ''}
        </div>
      );
    }
  }
  

  return <div className="board">{squares}</div>;
}

function renderPiece(piece: { type: string; color: 'w' | 'b' }) {
  const symbolMap: Record<string, string> = {
    pw: '♙', pb: '♟︎',
    rw: '♖', rb: '♜',
    nw: '♘', nb: '♞',
    bw: '♗', bb: '♝',
    qw: '♕', qb: '♛',
    kw: '♔', kb: '♚',
  };

  return symbolMap[piece.type + piece.color] || '?';
}
