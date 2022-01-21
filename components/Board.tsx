import { useAppSelector } from '../hooks/redux';
import Cell from './Cell';

const Board: React.FC = () => {
  const boardSize = useAppSelector(({ board }) => board.boardSize);
  const range = [...Array(boardSize).keys()];

  return (
    <div className="select-none">
      {range.map((row) => (
        <div className="flex" key={row}>
          {range.map((col) => (
            <Cell position={[row, col]} key={col} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
