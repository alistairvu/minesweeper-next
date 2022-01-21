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

  return (
    <div
      className={`h-9 w-9 sm:h-16 sm:w-16 font-bold flex justify-center items-center border sm:border-2 border-zinc-50 text-lg sm:text-3xl ${
        content === 9 ? 'bg-red-600' : 'bg-gray-200'
      } ${TEXT_COLORS[content - 1] ?? 'text-black'}`}
    >
      {content !== 0 && content !== 9 && <p>{content}</p>}
      {content === 9 && <p>💣</p>}
    </div>
  );
};

export default OpenedCell;
