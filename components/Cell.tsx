import { useAppSelector } from '../hooks/redux';
import ClosedCell from './ClosedCell';
import OpenedCell from './OpenedCell';

const Cell: React.FC<{ position: Position }> = ({ position }) => {
  const [x, y] = position;
  const isOpened = useAppSelector(({ board }) => board.opened[x][y]);
  const isOver = useAppSelector(({ board }) => board.isOver);
  const isWon = useAppSelector(({ board }) => board.isWon);
  const isOpenRendered = isOpened || isOver || isWon;

  return isOpenRendered ? (
    <OpenedCell position={position} />
  ) : (
    <ClosedCell position={position} />
  );
};

export default Cell;
