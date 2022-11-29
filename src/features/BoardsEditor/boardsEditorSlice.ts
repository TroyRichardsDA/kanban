import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { IBoard } from "../../models/IBoard";

function createNewColumn() {
  return {
    id: nanoid(),
    name: "",
    visited: false,
    tasks: [],
  };
}

const initialState: IBoard = {
  id: "",
  name: "",
  visited: false,
  columns: [createNewColumn(), createNewColumn()],
  isCurrent: false,
};

export const boardsEditorSlice = createSlice({
  name: "boardsEditor",
  initialState,
  reducers: {
    populateBoardsEditor: (_, action) => {
      return action.payload;
    },

    updateBoardName: (state, action) => {
      state.name = action.payload;
    },

    updateVisited: (state, action) => {
      state.visited = action.payload;
    },

    updateColumns: (state, action) => {
      const { id, name } = action.payload;

      state.columns.map((column) => {
        if (column.id === id) {
          return (column.name = name);
        } else {
          return column;
        }
      });
    },

    addColumn: (state) => {
      state.columns.push(createNewColumn());
    },

    removeColumn: (state, action) => {
      const selectedColumn = state.columns.find(
        (column) => column.id === action.payload
      );
      const index = state.columns.indexOf(selectedColumn!);

      state.columns.splice(index, 1);
    },

    updateColumnVisited: (state, action) => {
      const { id, bool } = action.payload;

      state.columns.map((col) => {
        if (col.id === id) {
          col.visited = bool;
        }
      });
    },

    resetBoardsEditor: () => initialState,
  },
});

export const {
  populateBoardsEditor,
  addColumn,
  updateColumns,
  removeColumn,
  updateBoardName,
  resetBoardsEditor,
  updateVisited,
  updateColumnVisited,
} = boardsEditorSlice.actions;

export default boardsEditorSlice.reducer;
