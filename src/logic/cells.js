export const cellMaker = () => {
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
  return cells;
};
