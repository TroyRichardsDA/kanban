import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    addTaskIsOpen: false,
  },
  reducers: {},
});

export default modalsSlice.reducer;
