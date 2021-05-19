import React, { useState } from "react";
import "./board.css";
import Scores from "../Scores";

function Board() {
  const [cells, setCell] = useState();
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
      <div className="Playground">Playground</div>
    </div>
  );
}

export default Board;
