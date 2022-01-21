type FindAdjacentParams = {
  boardSize: number;
  point: Position;
};

const findAdjacents = ({
  boardSize,
  point,
}: FindAdjacentParams): Array<Position> => {
  const results: Array<Position> = [];
  const [startX, startY] = point;

  for (let x of [-1, 0, 1]) {
    if (startX + x >= 0 && startX + x < boardSize) {
      for (let y of [-1, 0, 1]) {
        if (startY + y >= 0 && startY + y < boardSize) {
          if (x !== 0 || y !== 0) {
            results.push([startX + x, startY + y]);
          }
        }
      }
    }
  }

  return results;
};

export default findAdjacents;
