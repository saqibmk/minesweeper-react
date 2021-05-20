import React from "react";
import "./cell.css";
import PropTypes from "prop-types";

const Cell = ({ row, col, value, isClosed, onClick, isMine }) => {
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
      className={`Cell ${isClosed ? "" : "open"} ${isMine ? "mine" : ""}`}
    >
      {renderCells()}
    </div>
  );
};

Cell.propTypes = {
  row: PropTypes.number,
  col: PropTypes.number,
  value: PropTypes.number,
  isClosed: PropTypes.bool,
  onClick: PropTypes.func,
  isMine: PropTypes.bool,
};

export default Cell;
