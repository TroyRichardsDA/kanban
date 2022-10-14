import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../models/Board";

interface BoardsState {
  boards: Board[];
}

const initialState: BoardsState = {
  boards: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
});
