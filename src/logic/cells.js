export const cellMaker = () => {
  const cells = [];

  for (let i = 0; i < 5; i++) {
    cells.push([]);
    for (let x = 0; x < 5; x++) {
      cells[i].push({
        value: 0, // -1, 0, 1...8
        isClosed: true,
      });
    }
  }
  return cells;
};
