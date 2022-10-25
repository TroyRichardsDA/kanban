import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import Modal from "../../components/Modals/Modal";
import StatusSelection from "../../components/StatusSelection/StatusSelection";
import { changeTaskStatus, toggleTaskStatusList } from "../../context/boards";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { ITask } from "../../models/ITask";
import styles from "./ViewTask.module.scss";

interface Props {
  task: ITask;
}

function ViewTask(props: Props) {
  const { task } = props;
  const currentBoardColumns = useAppSelector(
    (state) => state.boards
  ).boards.find((board) => board.isCurrent)?.columns!;
  const { title, subtasks, description, status, statusListIsOpen } = task;
  const subtasksComplete = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const dispatch = useAppDispatch();

  const subtasksList = subtasks.map((subtask, id) => (
    <div className={styles.subtask} key={id}>
      <input type="checkbox" />
      <label>{subtask.title}</label>
    </div>
  ));

  function changeStatus(newStatus: string) {
    dispatch(changeTaskStatus({ newStatus, prev: status, task }));
  }

  function toggleStatusList() {
    dispatch(toggleTaskStatusList({ task, status }));
  }

  return (
    <Modal>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <img src={Ellipsis} alt="" />
      </div>
      <p className={styles.description}>{description}</p>
      <div>
        <h3 className={styles.subtitle}>
          Subtasks ({subtasksComplete} of {subtasks.length})
        </h3>
        <div className={styles.subtasks}>{subtasksList}</div>
      </div>
      <div className={styles.status}>
        <h3 className={styles.subtitle}>Current Status</h3>
        <StatusSelection
          status={status}
          statusListIsOpen={statusListIsOpen}
          columns={currentBoardColumns}
          changeStatus={changeStatus}
          toggleStatus={toggleStatusList}
        />
      </div>
    </Modal>
  );
}

export default ViewTask;
