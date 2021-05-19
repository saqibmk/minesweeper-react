import React from "react";
import "./cell.css";

const Cell = ({ row, col, value, isClosed, isFlagged }) => {
  const renderCells = () => {
    if (!isClosed) {
      if (value === -1)
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      return <div>{value}</div>;
    }
  };
  return (
    <div className={`Cell ${isClosed ? "" : "open"}`}>{renderCells()}</div>
  );
};

export default Cell;
