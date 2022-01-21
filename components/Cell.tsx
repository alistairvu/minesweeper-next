import { useAppSelector } from '../hooks/redux';
import ClosedCell from './ClosedCell';
import OpenedCell from './OpenedCell';

const Cell: React.FC<{ position: Position }> = ({ position }) => {
  const [x, y] = position;

  const isOpened = useAppSelector(({ board }) => board.opened[x][y]);
  const isFlagged = useAppSelector(({ board }) => board.flagged[x][y]);
  const isOver = useAppSelector(({ board }) => board.isOver);
  const content = useAppSelector(({ board }) => board.layout[x][y]);
  const isWon = useAppSelector(({ board }) => board.isWon);

  const isOpenRendered =
    isOpened ||
    (isOver && content === 9 && !isFlagged) ||
    (isOver && content !== 9 && isFlagged) ||
    isWon;

  return isOpenRendered ? (
    <OpenedCell position={position} />
  ) : (
    <ClosedCell position={position} />
  );
};

export default Cell;
