import { useAppSelector } from '../hooks/redux';

type OpenedCellProps = {
  position: Position;
};

const TEXT_COLORS = [
  'text-blue-600',
  'text-green-600',
  'text-red-600',
  'text-purple-600',
  'text-orange-600',
  'text-teal-600',
  'text-zinc-900',
  'text-zinc-600',
];

const OpenedCell = ({ position }: OpenedCellProps) => {
  const [x, y] = position;
  const content = useAppSelector(({ board }) => board.layout[x][y]);
  const isOpened = useAppSelector(({ board }) => board.opened[x][y]);
  const isFlagged = useAppSelector(({ board }) => board.flagged[x][y]);
  const isOver = useAppSelector(({ board }) => board.isOver);

  const getCellContent = () => {
    if (content === 0) {
      return null;
    }

    if (content === 9) {
      return <p>💣</p>;
    }

    if (isOver && isFlagged && content !== 9) {
      return <p>❌ </p>;
    }

    return <p>{content}</p>;
  };

  return (
    <div
      className={`h-9 w-9 sm:h-16 sm:w-16 font-bold flex justify-center items-center border sm:border-2 border-zinc-50 text-xl sm:text-4xl ${
        content === 9 && isOpened ? 'bg-red-500' : 'bg-gray-200'
      } ${TEXT_COLORS[content - 1] ?? 'text-black'}`}
    >
      {getCellContent()}
    </div>
  );
};

export default OpenedCell;
