import { createSlice } from "@reduxjs/toolkit";
import { IBoard } from "../models/IBoard";

interface BoardsState {
  boards: IBoard[];
}

const initialState: BoardsState = {
  boards: [{ name: "Platform Launch", columns: [], isCurrent: true }],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addNewBorad: (state, action) => {
      const newBoard: IBoard = {
        name: action.payload,
        columns: [],
        isCurrent: false,
      };
      state.boards.push(newBoard);
    },

    addColumnToBoard: (state, action) => {
      state.boards.map((board) => {
        if (board.isCurrent) {
          const cols = board.columns;

          if (cols.length === 0) {
            cols.push({ id: 1, name: "Todo", tasks: [] });
          } else if (cols.length === 1) {
            cols.push({ id: 2, name: "Doing", tasks: [] });
          } else if (cols.length === 2) {
            cols.push({ id: 3, name: "Done", tasks: [] });
          }
          return board;
        } else {
          return board;
        }
      });
    },

    addTaskToColumn: (state, action) => {
      const { column, task } = action.payload;

      const currentBoard = state.boards.find((board) => board.isCurrent)!;

      currentBoard.columns.map((col) => {
        if (col.name === column) {
          return col.tasks.push(task);
        } else {
          return col;
        }
      });
    },
  },
});

export const { addColumnToBoard, addNewBorad, addTaskToColumn } =
  boardsSlice.actions;
export default boardsSlice.reducer;
