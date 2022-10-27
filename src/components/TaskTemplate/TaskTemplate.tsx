import { ReactNode } from "react";
import { IColumn } from "../../models/IColumn";
import Modal from "../Modals/Modal";
import StatusSelection from "../StatusSelection/StatusSelection";
import styles from "./TaskTemplate.module.scss";

interface Props {
  heading: string;
  title: string;
  status: string;
  statusListIsOpen: boolean;
  columns: IColumn[];
  subtaskList: ReactNode;
  changeStatus: (e: string) => void;
  toggleStatus: () => void;
  updateTitle: (e: string) => void;
  updateDescription: (e: string) => void;
  addNewSubtask: (e: any) => void;
  sendTask: (e: any) => void;
}

function TaskTemplate(props: Props) {
  const { heading, title, status, statusListIsOpen, columns, subtaskList } =
    props;
  const {
    updateTitle,
    updateDescription,
    addNewSubtask,
    changeStatus,
    toggleStatus,
    sendTask,
  } = props;

  function nothing() {}

  return (
    <Modal toggle={nothing}>
      <h3 className={styles.header}>{heading}</h3>
      <form className={styles.form} onSubmit={(e) => sendTask(e)}>
        <label className={styles.label}>
          Title
          <input
            onChange={(e) => updateTitle(e.target.value)}
            value={title}
            placeholder="e.g Take coffee break"
            type="text"
          />
        </label>
        <label className={styles.label}>
          Description
          <textarea
            onChange={(e) => updateDescription(e.target.value)}
            rows={5}
            placeholder="e.g. It's always good to take a break."
          />
        </label>
        <label className={styles.label}>
          Subtasks
          {subtaskList}
        </label>
        <button className={styles.addsubtask} onClick={(e) => addNewSubtask(e)}>
          + Add New Subtask
        </button>
        <label className={styles.label}>
          Status
          <StatusSelection
            status={status}
            statusListIsOpen={statusListIsOpen}
            columns={columns}
            changeStatus={changeStatus}
            toggleStatus={toggleStatus}
          />
        </label>

        <button type="submit" className={styles.button}>
          Create Task
        </button>
      </form>
    </Modal>
  );
}

export default TaskTemplate;
