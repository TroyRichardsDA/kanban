import { nanoid } from "nanoid";
import { useEffect } from "react";
import EditableList from "../../components/EditableList/EditableList";
import FormInput from "../../components/FormInput/FormInput";
import Modal from "../../components/Modals/Modal";
import { addNewBoard, editBoard } from "../../context/boards";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  resetModalsSlice,
  resetPassedData,
  toggleBoardsEditor,
} from "../../context/modals";
import { IBoard } from "../../models/IBoard";
import {
  addColumn,
  populateBoardsEditor,
  removeColumn,
  resetBoardsEditor,
  updateBoardName,
  updateColumns,
  updateColumnVisited,
  updateVisited,
} from "./boardsEditorSlice";

const BoardsEditor = () => {
  const { name, columns, visited } = useAppSelector(
    (state) => state.boardsEditor
  );
  const { passedData } = useAppSelector((state) => state.modals);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (passedData) {
      dispatch(populateBoardsEditor(passedData));
    }
  }, []);

  function addNewColumn(e: any) {
    e.preventDefault();
    dispatch(addColumn());
  }

  function closeModal() {
    dispatch(toggleBoardsEditor(false));
    dispatch(resetBoardsEditor());
    dispatch(resetPassedData());
  }

  function updateName(e: any) {
    dispatch(updateBoardName(e.target.value));
  }

  function handleBlur(e: any) {
    dispatch(updateVisited(true));
  }

  function sendBoard(e: any) {
    e.preventDefault();
    const notNewBoard = passedData ? passedData.id : nanoid();
    const validColumns = columns.filter((column) => column.name !== "");

    const board: IBoard = {
      id: notNewBoard,
      name,
      isCurrent: true,
      visited: false,
      columns: validColumns,
    };

    const filledCorretly = board.name !== ("" || null);

    if (filledCorretly) {
      dispatch(toggleBoardsEditor(false));
      dispatch(resetBoardsEditor());

      if (!passedData) {
        dispatch(addNewBoard(board));
      } else {
        dispatch(editBoard(board));
      }

      dispatch(resetModalsSlice());
    }
  }

  const boardColumns = columns.map((column) => {
    const { name, id, visited } = column;

    function updateName(updated: string) {
      dispatch(updateColumns({ id, name: updated }));
    }

    function deleteColumn() {
      dispatch(removeColumn(id));
    }

    function updateColVisited() {
      dispatch(updateColumnVisited({ id, bool: true }));
    }

    return (
      <EditableList
        key={column.id}
        id={id}
        text={name}
        updateText={updateName}
        remove={deleteColumn}
        onBlur={updateColVisited}
        visited={visited}
      />
    );
  });

  return (
    <Modal toggle={closeModal}>
      <h3 className="editor_header">{passedData ? "Edit" : "Add New"} Board</h3>
      <form className="editor_form" onSubmit={(e) => sendBoard(e)}>
        <FormInput
          header="Board Name"
          value={name}
          onChange={updateName}
          type="text"
          onBlur={handleBlur}
          visited={visited}
        />
        <label className="editor_label editor_list">
          Board Columns
          {boardColumns}
        </label>
        <button className="editor_add-new" onClick={(e) => addNewColumn(e)}>
          + Add New Column
        </button>
        <button className="editor_submit-btn" type="submit">
          {passedData ? "Save Changes" : "Create New Board"}
        </button>
      </form>
    </Modal>
  );
};

export default BoardsEditor;
