import { NUMBER_OF_MINES, SQUARE_SIZE } from "../constants";

export const createCellsArray = (size) => {
  let cells = [];

  for (let i = 0; i < size; i++) {
    cells.push([]);
    for (let x = 0; x < size; x++) {
      cells[i].push({
        value: 0,
        isClosed: true,
      });
    }
  }

  return cells;
};

export const placeMines = (cells, numOfMines, gridSize) => {
  var minesPlaced = 0;
  const copyOfCells = cells.slice();
  while (minesPlaced < numOfMines) {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);

    const currentCell = copyOfCells[row][col];
    if (currentCell.value !== -1) {
      copyOfCells[row][col].value = -1;
      minesPlaced++;
    }
  }

  return copyOfCells;
};

export const cellsWithValue = (cells, gridSize) => {
  const copyOfCells = cells.slice();
  for (let i = 0; i < gridSize; i++) {
    for (let x = 0; x < gridSize; x++) {
      copyOfCells[i][x].value = calculateNeighbour(copyOfCells, gridSize, i, x);
    }
  }
  return copyOfCells;
};

export const calculateNeighbour = (cells, girdSize, rowIndex, columnIndex) => {
  if (cells[rowIndex][columnIndex].value === -1) return -1;
  let total = 0;
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      const i = xoff + rowIndex;
      const y = yoff + columnIndex;
      if (i > -1 && i < girdSize && y > -1 && y < girdSize) {
        var neighbour = cells[i][y];
        if (neighbour.value === -1) total++;
      }
    }
  }
  return total;
};

export const cellMaker = () => {
  const cells = createCellsArray(SQUARE_SIZE);
  const cellsWithMines = placeMines(cells, NUMBER_OF_MINES, SQUARE_SIZE);
  const cellsToReturn = cellsWithValue(cellsWithMines, SQUARE_SIZE);
  return cellsToReturn;
};

export const showCell = (cells, rowIndex, columnIndex, gridSize) => {
  const cellsCopy = cells.slice();
  cellsCopy[rowIndex][columnIndex].isClosed = false;
  if (cellsCopy[rowIndex][columnIndex].value === 0) {
    floodFillShow(cellsCopy, rowIndex, columnIndex, gridSize);
  }
  return cellsCopy;
};

const floodFillShow = (cells, rowIndex, columnIndex, gridSize) => {
  const currentCells = cells.slice();
  for (var xoff = -1; xoff <= 1; xoff++) {
    for (var yoff = -1; yoff <= 1; yoff++) {
      const i = xoff + rowIndex;
      const y = yoff + columnIndex;
      if (i > -1 && i < gridSize && y > -1 && y < gridSize) {
        var neighbour = currentCells[i][y];
        if (neighbour.value !== -1 && neighbour.isClosed === true) {
          showCell(currentCells, i, y, gridSize);
        }
      }
    }
  }
  return currentCells;
};
