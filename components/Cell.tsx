import { useAppSelector } from '../hooks/redux';
import ClosedCell from './ClosedCell';
import OpenedCell from './OpenedCell';

type CellProps = {
  position: Position;
};

const Cell: React.FC<CellProps> = ({ position }) => {
  const [y, x] = position;

  const isOpened = useAppSelector(({ board }) => board.opened[y][x]);
  const isFlagged = useAppSelector(({ board }) => board.flagged[y][x]);
  const isOver = useAppSelector(({ board }) => board.isOver);
  const content = useAppSelector(({ board }) => board.layout[y][x]);
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
