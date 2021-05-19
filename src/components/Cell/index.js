import React from "react";
import "./cell.css";

const Cell = ({ row, col, value, isClosed }) => {
  return (
    <div className={`Cell ${isClosed ? "" : "open"}`}>
      {!isClosed && <div>{value}</div>}
    </div>
  );
};

export default Cell;
