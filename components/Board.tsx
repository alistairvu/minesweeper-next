import { useAppSelector } from '../hooks/redux';
import Cell from './Cell';

const Board: React.FC = () => {
  const boardSize = useAppSelector(({ board }) => board.boardSize);
  const range = [...Array(boardSize).keys()];

  return (
    <>
      {range.map((row) => (
        <div className="flex" key={row}>
          {range.map((col) => (
            <Cell position={[row, col]} key={col} />
          ))}
        </div>
      ))}
    </>
  );
};

export default Board;
