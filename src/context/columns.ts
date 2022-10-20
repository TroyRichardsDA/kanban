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
        cols.push({ id: 1, name: "Todo" });
      } else if (cols.length === 1) {
        cols.push({ id: 2, name: "Doing", tasks: [] });
      } else if (cols.length === 2) {
        cols.push({ id: 3, name: "Done", tasks: [] });
      }
    },
  },
});

export const { addColumn } = columnsSlice.actions;

export default columnsSlice.reducer;
