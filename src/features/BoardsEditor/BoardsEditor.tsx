import { nanoid } from "nanoid";
import { useEffect } from "react";
import EditableList from "../../components/EditableList/EditableList";
import Modal from "../../components/Modals/Modal";
import { addNewBoard, editBoard } from "../../context/boards";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { resetModalsSlice, toggleBoardsEditor } from "../../context/modals";
import { IBoard } from "../../models/IBoard";
import styles from "../../styles/editors.module.scss";
import {
  addColumn,
  populateBoardsEditor,
  removeColumn,
  resetBoardsEditor,
  updateBoardName,
  updateColumns,
} from "./boardsEditorSlice";

const BoardsEditor = () => {
  const { name, columns } = useAppSelector((state) => state.boardsEditor);
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
    dispatch(resetModalsSlice());
  }

  function sendBoard(e: any) {
    e.preventDefault();
    const notNewBoard = passedData ? passedData.id : nanoid();
    const validColumns = columns.filter((column) => column.name !== "");

    const board: IBoard = {
      id: notNewBoard,
      name,
      isCurrent: true,
      columns: validColumns,
    };

    const filledCorretly =
      Object.values(board).every((value) => value != null && value) &&
      board.columns.length > 0;

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
    const { name, id } = column;

    function updateName(updated: string) {
      dispatch(updateColumns({ id, name: updated }));
    }

    function deleteColumn() {
      dispatch(removeColumn(id));
    }

    return (
      <EditableList
        id={id}
        text={name}
        updateText={updateName}
        remove={deleteColumn}
      />
    );
  });

  return (
    <Modal toggle={closeModal}>
      <h3 className={styles.header}>{passedData ? "Edit" : "Add New"} Board</h3>
      <form className={styles.form} onSubmit={(e) => sendBoard(e)}>
        <label className={styles.label}>
          Board Name
          <input
            value={name}
            onChange={(e) => dispatch(updateBoardName(e.target.value))}
            type="text"
          />
        </label>
        <label className={styles.label}>
          Board Columns
          {boardColumns}
        </label>
        <button className={styles.addNew} onClick={(e) => addNewColumn(e)}>
          + Add New Column
        </button>
        <button className={styles.submitButton} type="submit">
          {passedData ? "Save Changes" : "Create New Board"}
        </button>
      </form>
    </Modal>
  );
};

export default BoardsEditor;
