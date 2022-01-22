import { useAppSelector } from '../hooks/redux';

type OpenedCellProps = {
  position: Position;
};

const TEXT_COLORS = [
  'text-blue-600',
  'text-green-600',
  'text-red-500',
  'text-purple-600',
  'text-orange-600',
  'text-teal-600',
  'text-zinc-900',
  'text-zinc-600',
];

const OpenedCell: React.FC<OpenedCellProps> = ({ position }) => {
  const [y, x] = position;
  const content = useAppSelector(({ board }) => board.layout[y][x]);
  const isOpened = useAppSelector(({ board }) => board.opened[y][x]);
  const isFlagged = useAppSelector(({ board }) => board.flagged[y][x]);
  const isOver = useAppSelector(({ board }) => board.isOver);

  const getCellContent = () => {
    if (content === 0) {
      return null;
    }

    if (isFlagged && content === 9) {
      return <p>✅</p>;
    }
    if (content === 9) {
      return <p>💣</p>;
    }

    if (isOver && isFlagged) {
      return <p>❌</p>;
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
