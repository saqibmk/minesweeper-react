import React, { useState, useEffect } from "react";
import "./board.css";
import Scores from "../Scores";
import Cell from "../Cell";
import { NUMBER_OF_MINES, SQUARE_SIZE } from "../../constants";
import { cellMaker, showCell } from "../../logic/cells";

function Board() {
  const [cells, setCell] = useState(cellMaker());
  const [currentEmoji, setCurrentEmoji] = useState("🥸");
  const [gameTime, setGameTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setGameTime(gameTime + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [gameStarted, gameTime]);

  useEffect(() => {
    if (gameOver) {
      setGameStarted(false);
      setCurrentEmoji("😵");
    }
  }, [gameOver]);

  useEffect(() => {
    if (win) {
      setGameStarted(false);
      setCurrentEmoji("🥳");
    }
  }, [win]);

  const showAllMines = (currentCells) => {
    return currentCells.map((row) =>
      row.map((cell) => {
        if (cell.value === -1)
          return {
            ...cell,
            isClosed: false,
          };
        return cell;
      })
    );
  };

  const handleCellClick = (r, c) => {
    if (gameOver || win) return;
    if (!gameStarted) setGameStarted(true);
    if (cells[r][c].value === -1) {
      setGameOver(true);
      setCell(showAllMines(cells));
      return;
    }
    setCell(showCell(cells, r, c, SQUARE_SIZE));

    let hasMoreOpenCells = false;

    for (let row = 0; row < SQUARE_SIZE; row++) {
      for (let col = 0; col < SQUARE_SIZE; col++) {
        if (cells[row][col].value !== -1 && cells[row][col].isClosed) {
          hasMoreOpenCells = true;
          break;
        }
      }
    }

    if (!hasMoreOpenCells) {
      setWin(true);
    }
  };

  const handleEmojiClick = () => {
    setGameStarted(false);
    setGameTime(0);
    setGameOver(false);
    setCurrentEmoji("🥸");
    setCell(cellMaker());
  };

  return (
    <div className="Board">
      <div className="Header">
        <Scores score={`${NUMBER_OF_MINES} mines`}></Scores>
        <div className="Emoji" onClick={handleEmojiClick}>
          <span role="img" aria-label="emoji">
            {currentEmoji}
          </span>
        </div>
        <Scores score={`${gameTime} sec`}></Scores>
      </div>
      <div className="Playground">
        {cells.map((row, i) =>
          row.map((cell, cIndex) => (
            <Cell
              key={`${i}-${cIndex}`}
              row={i}
              col={cIndex}
              value={cell.value}
              isClosed={cell.isClosed}
              onClick={handleCellClick}
              isMine={cell.value === -1}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
