import findAdjacents from './findAdjacent';

export const generateLayout = ({
  boardSize,
  bombCount,
}: {
  boardSize: number;
  bombCount: number;
}) => {
  const layout = new Array(boardSize)
    .fill(0)
    .map(() => new Array(boardSize).fill(0));

  let generatedBombs = 0;

  while (generatedBombs < bombCount) {
    const x = Math.floor(Math.random() * boardSize);
    const y = Math.floor(Math.random() * boardSize);

    if (layout[x][y] !== 9) {
      layout[x][y] = 9;

      const adjacents = findAdjacents({
        boardSize: boardSize,
        point: [x, y],
      });

      for (let [cellX, cellY] of adjacents) {
        layout[cellX][cellY] = Math.min(9, layout[cellX][cellY] + 1);
      }

      generatedBombs++;
    }
  }

  return layout;
};

export const countTrue = (array: boolean[][]) =>
  array.reduce((acc, row) => acc + row.filter((elem) => elem).length, 0);
