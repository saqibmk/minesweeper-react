export const cellMaker = () => {
  const calculateNeighbour = (rowIndex, columnIndex) => {
    if (cells[rowIndex][columnIndex].value === -1) return -1;
    let total = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
      for (var yoff = -1; yoff <= 1; yoff++) {
        const i = xoff + rowIndex;
        const y = yoff + columnIndex;
        if (i > -1 && i < 5 && y > -1 && y < 5) {
          var neighbour = cells[i][y];
          if (neighbour.value === -1) total++;
        }
      }
    }
    return total;
  };
  let cells = [];

  for (let i = 0; i < 5; i++) {
    cells.push([]);
    for (let x = 0; x < 5; x++) {
      cells[i].push({
        value: 0, // -1, 0, 1...8
        isClosed: false,
      });
    }
  }

  // generate bombs
  var bombsPlaced = 0;
  while (bombsPlaced < 5) {
    const row = Math.floor(Math.random() * 5);
    const col = Math.floor(Math.random() * 5);

    const currentCell = cells[row][col];
    if (currentCell.value !== -1) {
      cells[row][col].value = -1;
      bombsPlaced++;
    }
  }

  for (let i = 0; i < 5; i++) {
    for (let x = 0; x < 5; x++) {
      cells[i][x].value = calculateNeighbour(i, x);
    }
  }

  return cells;
};
