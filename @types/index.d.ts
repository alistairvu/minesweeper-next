type Position = [number, number];

interface BoardState {
  layout: number[][];
  flagged: boolean[][];
  opened: boolean[][];
  boardSize: number;
  bombCount: number;
}
