import {
  createCellsArray,
  placeMines,
  calculateNeighbour,
  cellsWithValue,
  showCell,
} from "./cells";

test("Array lengths to equal 5", () => {
  const testArray = createCellsArray(5);
  expect(testArray.length).toEqual(5);
  expect(testArray[0].length).toEqual(5);
});

test("Object in array to have properties", () => {
  const testArray = createCellsArray(5);
  const expectedObject = {
    value: 0,
    isClosed: true,
  };
  expect(testArray[0][0]).toStrictEqual(expectedObject);
});

test("total number of mines to equal 5 with grid size 10", () => {
  const testArray = createCellsArray(10);

  const minedCells = placeMines(testArray, 5, 10);
  let totalMinesFound = 0;

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (minedCells[row][col].value === -1) totalMinesFound++;
    }
  }

  expect(totalMinesFound).toEqual(5);
});

test("given a array with mines, neighbours value should be calculated properly", () => {
  const minedArray = [
    [{ value: -1 }, { value: 0 }, { value: 0 }],
    [{ value: 0 }, { value: 0 }, { value: 0 }],
    [{ value: 0 }, { value: 0 }, { value: 0 }],
  ];
  const outPutArray = cellsWithValue(minedArray, 3);
  let totalValue = 0;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      totalValue = totalValue + outPutArray[row][col].value;
    }
  }
  expect(totalValue).toEqual(2);
});

test("calculate cell value", () => {
  const minedArray = [
    [{ value: -1 }, { value: 0 }, { value: 0 }],
    [{ value: 0 }, { value: 0 }, { value: 0 }],
    [{ value: 0 }, { value: 0 }, { value: 0 }],
  ];
  const firstValue = calculateNeighbour(minedArray, 3, 0, 1);
  const secondValue = calculateNeighbour(minedArray, 3, 2, 1);
  expect(firstValue).toEqual(1);
  expect(secondValue).toEqual(0);
});

test("show cell given the index", () => {
  const testArray = [
    [
      { value: 0, isClosed: true },
      { value: 1, isClosed: true },
      { value: 1, isClosed: true },
    ],
    [
      { value: 1, isClosed: true },
      { value: 1, isClosed: true },
      { value: 1, isClosed: true },
    ],
    [
      { value: 1, isClosed: true },
      { value: 1, isClosed: true },
      { value: 1, isClosed: true },
    ],
  ];

  const resultCells = showCell(testArray, 1, 1, 3);
  expect(resultCells[1][1].isClosed).toEqual(false);
});

test("show cell with flood fill", () => {
  const testArray = [
    [
      { value: 0, isClosed: true },
      { value: 1, isClosed: true },
      { value: 1, isClosed: true },
    ],
    [
      { value: 1, isClosed: true },
      { value: 1, isClosed: true },
      { value: 1, isClosed: true },
    ],
    [
      { value: 1, isClosed: true },
      { value: 1, isClosed: true },
      { value: 1, isClosed: true },
    ],
  ];

  const resultCells = showCell(testArray, 0, 0, 3);
  expect(resultCells[0][1].isClosed).toEqual(false);
  expect(resultCells[1][0].isClosed).toEqual(false);
  expect(resultCells[2][0].isClosed).toEqual(true);
});
