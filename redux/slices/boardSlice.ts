import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countTrue, generateLayout } from '../../utils/boardUtils';
import findAdjacents from '../../utils/findAdjacent';
import Queue from '../../utils/Queue';

const DEFAULT_BOARD_SIZE = 10;
const DEFAULT_BOMB_COUNT = 10;

const initialState: BoardState = {
  boardSize: DEFAULT_BOARD_SIZE,
  bombCount: DEFAULT_BOMB_COUNT,
  opened: new Array(DEFAULT_BOARD_SIZE)
    .fill(0)
    .map(() => new Array(DEFAULT_BOARD_SIZE).fill(false)),

  flagged: new Array(DEFAULT_BOARD_SIZE)
    .fill(0)
    .map(() => new Array(DEFAULT_BOARD_SIZE).fill(false)),

  layout: generateLayout({
    boardSize: DEFAULT_BOARD_SIZE,
    bombCount: DEFAULT_BOMB_COUNT,
  }),

  isOver: false,
  isWon: false,
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    initializeBoard: (state) => {
      state.flagged = new Array(state.boardSize)
        .fill(0)
        .map(() => new Array(state.boardSize).fill(false));

      state.opened = new Array(state.boardSize)
        .fill(0)
        .map(() => new Array(state.boardSize).fill(false));

      state.layout = generateLayout({
        boardSize: state.boardSize,
        bombCount: state.bombCount,
      });

      state.isOver = false;
      state.isWon = false;
    },

    openCell: (state, action: PayloadAction<Position>) => {
      const [y, x] = action.payload;

      if (!state.isOver && !state.isWon && !state.flagged[y][x]) {
        state.opened[y][x] = true;

        const toOpen = new Queue<Position>();

        if (state.layout[y][x] === 9) {
          state.isOver = true;
          return;
        }

        if (state.layout[y][x] === 0) {
          toOpen.enqueue([y, x]);
        }

        while (!toOpen.isEmpty()) {
          const current = toOpen.dequeue();

          if (current) {
            const adjacents = findAdjacents({
              boardSize: state.boardSize,
              point: current,
            });

            adjacents.forEach(([adjacentY, adjacentX]) => {
              if (
                !state.opened[adjacentY][adjacentX] &&
                !state.flagged[adjacentY][adjacentX]
              ) {
                state.opened[adjacentY][adjacentX] = true;

                if (state.layout[adjacentY][adjacentX] === 0) {
                  toOpen.enqueue([adjacentY, adjacentX]);
                }
              }
            });
          }
        }

        const openedCount = countTrue(state.opened);

        if (
          openedCount + state.bombCount ===
          state.boardSize * state.boardSize
        ) {
          state.isWon = true;
        }
      }
    },

    toggleFlagCell: (state, action: PayloadAction<Position>) => {
      const [y, x] = action.payload;
      const prev = state.flagged[y][x];
      state.flagged[y][x] = !prev;
    },
  },
});

export const { initializeBoard, openCell, toggleFlagCell } = boardSlice.actions;
export default boardSlice.reducer;
