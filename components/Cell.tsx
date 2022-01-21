import { useAppSelector } from '../hooks/redux';
import ClosedCell from './ClosedCell';
import OpenedCell from './OpenedCell';

const Cell: React.FC<{ position: Position }> = ({ position }) => {
  const [x, y] = position;
  const isOpened = useAppSelector(({ board }) => board.opened[x][y]);

  return isOpened ? (
    <OpenedCell position={position} />
  ) : (
    <ClosedCell position={position} />
  );
};

export default Cell;
