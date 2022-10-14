import { createSlice } from "@reduxjs/toolkit";
import { Column } from "../models/Column";

interface ColumnsState {
  columns: Column[];
}

const initialState: ColumnsState = {
  columns: [],
};

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    addColumn: (state) => {
      const cols = state.columns;

      if (cols.length === 0) {
        cols.push({ name: "todo" });
      }
    },
  },
});

export const { addColumn } = columnsSlice.actions;

export default columnsSlice.reducer;
