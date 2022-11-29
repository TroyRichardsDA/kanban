import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { IBoard } from "../models/IBoard";
import { ITask } from "../models/ITask";

interface BoardsState {
  boards: IBoard[];
}

const initialState: BoardsState = {
  boards: [
    {
      id: nanoid(),
      visited: false,
      name: "Platform Launch",
      columns: [],
      isCurrent: true,
    },
  ],
};

function findCurrentBoard(state: BoardsState) {
  return state.boards.find((board) => board.isCurrent)!;
}

function findCurrentTask(state: BoardsState, name: string, task: ITask) {
  const currentTask = findCurrentBoard(state)
    .columns.find((col) => col.name === name)!
    .tasks.find((current) => current.id === task.id)!;
  return currentTask;
}

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addNewBorad: (state, action) => {
      const newBoard: IBoard = {
        id: "12mlksdf",
        name: action.payload,
        visited: false,
        columns: [],
        isCurrent: false,
      };
      state.boards.push(newBoard);
    },

    addNewBoard: (state, action) => {
      state.boards.map((board) => {
        return (board.isCurrent = false);
      });
      state.boards.push(action.payload);
    },

    editBoard: (state, action) => {
      const currentBoard = findCurrentBoard(state);
      const index = state.boards.indexOf(currentBoard);
      state.boards.splice(index, 1, action.payload);
    },

    changeBoard: (state, action) => {
      state.boards.map((board) => {
        if (board.id !== action.payload) {
          return (board.isCurrent = false);
        } else {
          return (board.isCurrent = true);
        }
      });
    },

    deleteBoard: (state) => {
      if (state.boards.length > 1) {
        const currentBoard = findCurrentBoard(state);
        const index = state.boards.indexOf(currentBoard);
        state.boards.splice(index, 1);
        state.boards[0].isCurrent = true;
      } else {
        alert(
          "You must have atleast one board active at all times. Please make another board before trying to delete this one."
        );
      }
    },

    addColumnToBoard: (state) => {
      state.boards.map((board) => {
        if (board.isCurrent) {
          const cols = board.columns;

          if (cols.length === 0) {
            cols.push({
              id: nanoid(),
              visited: false,
              name: "Todo",
              tasks: [],
            });
          } else if (cols.length === 1) {
            cols.push({
              id: nanoid(),
              visited: false,
              name: "Doing",
              tasks: [],
            });
          } else if (cols.length === 2) {
            cols.push({
              id: nanoid(),
              visited: false,
              name: "Done",
              tasks: [],
            });
          } else {
            cols.push({
              id: nanoid(),
              visited: false,
              name: "New Column",
              tasks: [],
            });
          }
          return board;
        } else {
          return board;
        }
      });
    },

    addTaskToColumn: (state, action) => {
      const { column, task } = action.payload;

      const currentBoard = findCurrentBoard(state);

      currentBoard.columns.map((col) => {
        if (col.name === column) {
          return col.tasks.push(task);
        } else {
          return col;
        }
      });
    },

    deleteTask: (state, action) => {
      const { task, status } = action.payload;
      const currentBoard = findCurrentBoard(state);
      const currentTask = findCurrentTask(state, status, task);

      currentBoard.columns.map((col) => {
        const index = col.tasks.indexOf(currentTask);
        if (col.name === status) {
          col.tasks.splice(index, 1);
        }
      });
    },

    editTask: (state, action) => {
      const { task, status } = action.payload;
      const currentBoard = findCurrentBoard(state);
      const currentTask = findCurrentTask(state, status, task);

      currentBoard.columns.map((col) => {
        const index = col.tasks.indexOf(currentTask);
        if (col.name === status) {
          col.tasks.splice(index, 1, task);
        }
      });
    },

    changeTaskStatus: (state, action) => {
      const { newStatus, prev, task } = action.payload;
      const currentBoard = findCurrentBoard(state);
      const currentTask = findCurrentTask(state, prev, task);
      currentTask.status = newStatus;

      currentBoard.columns.map((col) => {
        const index = col.tasks.indexOf(currentTask);
        if (col.name === prev) {
          col.tasks.splice(index, 1);
        }
        if (col.name === newStatus) {
          col.tasks.push(currentTask);
        }
      });
    },

    toggleTaskStatusList: (state, action) => {
      const { task, status } = action.payload;
      const currentTask = findCurrentTask(state, status, task);
      currentTask.statusListIsOpen = !currentTask.statusListIsOpen;
    },
  },
});

export const {
  addColumnToBoard,
  addNewBorad,
  addTaskToColumn,
  changeTaskStatus,
  toggleTaskStatusList,
  deleteTask,
  deleteBoard,
  editTask,
  addNewBoard,
  editBoard,
  changeBoard,
} = boardsSlice.actions;

export default boardsSlice.reducer;
