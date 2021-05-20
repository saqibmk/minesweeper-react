import { NUMBER_OF_MINES, SQUARE_SIZE } from "../constants";

export const cellMaker = () => {
  const calculateNeighbour = (rowIndex, columnIndex) => {
    if (cells[rowIndex][columnIndex].value === -1) return -1;
    let total = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
        const i = xoff + rowIndex;
        const y = yoff + columnIndex;
        if (i > -1 && i < SQUARE_SIZE && y > -1 && y < SQUARE_SIZE) {
          var neighbour = cells[i][y];
          if (neighbour.value === -1) total++;
        }
      }
    }
    return total;
  };
  let cells = [];

  for (let i = 0; i < SQUARE_SIZE; i++) {
    cells.push([]);
    for (let x = 0; x < SQUARE_SIZE; x++) {
      cells[i].push({
        value: 0,
        isClosed: true,
      });
    }
  }

  var minesPlaced = 0;
  while (minesPlaced < NUMBER_OF_MINES) {
    const row = Math.floor(Math.random() * SQUARE_SIZE);
    const col = Math.floor(Math.random() * SQUARE_SIZE);

    const currentCell = cells[row][col];
    if (currentCell.value !== -1) {
      cells[row][col].value = -1;
      minesPlaced++;
    }
  }

  for (let i = 0; i < SQUARE_SIZE; i++) {
    for (let x = 0; x < SQUARE_SIZE; x++) {
      cells[i][x].value = calculateNeighbour(i, x);
    }
  }

  return cells;
};

export const showCell = (cells, rowIndex, columnIndex) => {
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
      if (i > -1 && i < SQUARE_SIZE && y > -1 && y < SQUARE_SIZE) {
        var neighbour = currentCells[i][y];
        if (neighbour.value !== -1 && neighbour.isClosed === true) {
          showCell(currentCells, i, y);
        }
      }
    }
  }
  return currentCells;
};
