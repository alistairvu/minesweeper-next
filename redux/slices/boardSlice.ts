import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { countOpened, generateLayout } from '../../utils/boardUtils';
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
      const [x, y] = action.payload;
      state.opened[x][y] = true;

      const toOpen = new Queue<Position>();

      if (state.layout[x][y] === 9) {
        state.isOver = true;
        return;
      }

      if (state.layout[x][y] === 0) {
        toOpen.enqueue([x, y]);
      }

      while (!toOpen.isEmpty()) {
        const current = toOpen.dequeue();

        if (current) {
          const adjacents = findAdjacents({
            boardSize: state.boardSize,
            point: current,
          });

          for (let [adjacentX, adjacentY] of adjacents) {
            if (!state.opened[adjacentX][adjacentY]) {
              state.opened[adjacentX][adjacentY] = true;

              if (state.layout[adjacentX][adjacentY] === 0) {
                toOpen.enqueue([adjacentX, adjacentY]);
              }
            }
          }
        }
      }

      const openedCount = countOpened(state.opened);

      if (openedCount + state.bombCount === state.boardSize * state.boardSize) {
        state.isWon = true;
      }
    },

    toggleFlagCell: (state, action: PayloadAction<Position>) => {
      const [x, y] = action.payload;
      const prev = state.flagged[x][y];
      state.flagged[x][y] = !prev;
    },
  },
});

export const { initializeBoard, openCell, toggleFlagCell } = boardSlice.actions;
export default boardSlice.reducer;
