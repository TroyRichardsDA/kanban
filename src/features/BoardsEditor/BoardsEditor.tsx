import { useEffect } from "react";
import EditableList from "../../components/EditableList/EditableList";
import Modal from "../../components/Modals/Modal";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import styles from "../../styles/editors.module.scss";
import {
  populateBoardsEditor,
  removeColumn,
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
    <Modal>
      <h3>{passedData ? "Edit" : "Add New"} Board</h3>
      <form className={styles.form}>
        Board Name
        <label className={styles.label}>
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
        <button className={styles.addNew}>+ Add New Column</button>
        <button className={styles.submitButton}>
          {passedData ? "Save Changes" : "Create New Board"}
        </button>
      </form>
    </Modal>
  );
};

export default BoardsEditor;
