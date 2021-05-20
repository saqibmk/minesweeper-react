import React from "react";
import "./cell.css";

const Cell = ({ row, col, value, isClosed, isFlagged, onClick }) => {
  const renderCells = () => {
    if (!isClosed) {
      if (value === -1)
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      if (value === 0) return null;
      return <div>{value}</div>;
    }
  };
  return (
    <div
      onClick={() => onClick(row, col)}
      className={`Cell ${isClosed ? "" : "open"}`}
    >
      {renderCells()}
    </div>
  );
};

export default Cell;
