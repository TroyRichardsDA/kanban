import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { IBoard } from "../../models/IBoard";

function createNewColumn() {
  return {
    id: nanoid(),
    name: "",
    tasks: [],
  };
}

const initialState: IBoard = {
  id: "",
  name: "",
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
} = boardsEditorSlice.actions;

export default boardsEditorSlice.reducer;
