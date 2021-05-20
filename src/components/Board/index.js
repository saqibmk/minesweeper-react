import React, { useState, useEffect } from "react";
import "./board.css";
import Scores from "../Scores";
import Cell from "../Cell";

import { cellMaker } from "../../logic/cells";

const showCell = (cells, rowIndex, columnIndex) => {
  const cellsCopy = cells.slice();
  cellsCopy[rowIndex][columnIndex].isClosed = false;
  if (cellsCopy[rowIndex][columnIndex].value === 0) {
    floodFillShow(cellsCopy, rowIndex, columnIndex);
  }
  return cellsCopy;
};

const floodFillShow = (cells, rowIndex, columnIndex) => {
  const currentCells = cells.slice();
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      const i = xoff + rowIndex;
      const y = yoff + columnIndex;
      if (i > -1 && i < 10 && y > -1 && y < 10) {
        var neighbour = currentCells[i][y];
        if (neighbour.value !== -1 && neighbour.isClosed === true) {
          showCell(currentCells, i, y);
        }
      }
    }
  }
  return currentCells;
};

function Board() {
  const [cells, setCell] = useState(cellMaker());
  const [gameTime, setGameTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

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

  const handleCellClick = (r, c) => {
    if (!gameStarted) setGameStarted(true);

    setCell(showCell(cells, r, c));
  };

  const handleEmojiClick = () => {
    setGameStarted(false);
    setGameTime(0);
    setCell(cellMaker());
  };

  return (
    <div className="Board">
      <div className="Header">
        <Scores score={"000"}></Scores>
        <div className="Emoji" onClick={handleEmojiClick}>
          <span role="img" aria-label="emoji">
            😆
          </span>
        </div>
        <Scores score={gameTime}></Scores>
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
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
