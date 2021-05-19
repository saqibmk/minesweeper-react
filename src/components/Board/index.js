import React, { useState } from "react";
import "./board.css";
import Scores from "../Scores";
import Cell from "../Cell";

import { cellMaker } from "../../logic/cells";
function Board() {
  const [cells, setCell] = useState(cellMaker());
  console.log("cells", cells);
  return (
    <div className="Board">
      <div className="Header">
        <Scores score={"000"}></Scores>
        <div className="Emoji">
          <span role="img" aria-label="emoji">
            😆
          </span>
        </div>
        <Scores score={"000"}></Scores>
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
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
