import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { openCell, toggleFlagCell } from '../redux/slices/boardSlice';
import { useLongPress } from 'use-long-press';

type ClosedCellProps = {
  position: Position;
};

const ClosedCell = ({ position }: ClosedCellProps) => {
  const dispatch = useAppDispatch();
  const [y, x] = position;
  const isFlagged = useAppSelector(({ board }) => board.flagged[y][x]);

  const handleLongPress = useLongPress(() => {
    dispatch(toggleFlagCell(position));
  });

  return (
    <button
      className="h-9 w-9 sm:h-16 sm:w-16 bg-gray-400 border sm:border-2 border-zinc-50 text-xl sm:text-4xl"
      onClick={() => {
        dispatch(openCell(position));
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(toggleFlagCell(position));
      }}
      {...handleLongPress}
    >
      {isFlagged && <p>🚩</p>}
    </button>
  );
};

export default ClosedCell;
