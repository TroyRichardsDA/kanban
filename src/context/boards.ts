import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../models/Board";

const initialState: Board[] = [
  {
    name: "Platform Lanuch",
  },
];

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
});
