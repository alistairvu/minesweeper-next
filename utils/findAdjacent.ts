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

  [-1, 0, 1].forEach((x) => {
    if (startX + x >= 0 && startX + x < boardSize) {
      [-1, 0, 1].forEach((y) => {
        if (startY + y >= 0 && startY + y < boardSize) {
          if (x !== 0 || y !== 0) {
            results.push([startX + x, startY + y]);
          }
        }
      });
    }
  });

  return results;
};

export default findAdjacents;
