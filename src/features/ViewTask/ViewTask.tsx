import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import MiniModal from "../../components/MiniModal/MiniModal";
import Modal from "../../components/Modals/Modal";
import StatusSelection from "../../components/StatusSelection/StatusSelection";
import {
  changeTaskStatus,
  toggleTaskStatusList,
  toggleViewTask,
  updateSubTaskIsComplete,
} from "../../context/boards";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  populateData,
  toggleDeleteModal,
  toggleTaskMiniModal,
} from "../../context/modals";
import { ITask } from "../../models/ITask";
import DeleteType from "../DeleteType/DeleteType";
import styles from "./ViewTask.module.scss";

interface Props {
  task: ITask;
}

function ViewTask(props: Props) {
  const { task } = props;
  const { title, subtasks, description, status, statusListIsOpen } = task;
  const { deleteTypeIsOpen, taskMiniModalIsOpen } = useAppSelector(
    (state) => state.modals
  );
  const dispatch = useAppDispatch();

  const currentBoardColumns = useAppSelector(
    (state) => state.boards
  ).boards.find((board) => board.isCurrent)?.columns!;

  const subtasksComplete = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  const subtasksList = subtasks.map((subtask, id) => {
    const { isCompleted } = subtask;

    function updateCompleted(e: any) {
      if (e.target.checked) {
        dispatch(
          updateSubTaskIsComplete({ task, status, id: subtask.id, bool: true })
        );
      } else {
        dispatch(
          updateSubTaskIsComplete({ task, status, id: subtask.id, bool: false })
        );
      }
    }

    return (
      <div className={styles.subtask} key={id}>
        <input
          onChange={(e) => updateCompleted(e)}
          type="checkbox"
          checked={isCompleted}
          className={styles.checkbox}
        />
        <label className={`${isCompleted && styles.completed}`}>
          {subtask.title}
        </label>
      </div>
    );
  });

  function closeModal() {
    dispatch(toggleViewTask({ task, status, bool: false }));
  }

  function changeStatus(newStatus: string) {
    if (newStatus !== status) {
      dispatch(changeTaskStatus({ newStatus, prev: status, task }));
    }
  }

  function toggleStatusList() {
    dispatch(toggleTaskStatusList({ task, status }));
  }

  function openDeleteModal() {
    dispatch(toggleDeleteModal(true));
    dispatch(populateData(task));
    closeModal();
  }

  function editTask() {}

  function openMiniModal() {
    dispatch(toggleTaskMiniModal());
  }

  return (
    <Modal toggle={closeModal}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <img onClick={openMiniModal} src={Ellipsis} alt="" />
        {taskMiniModalIsOpen && (
          <MiniModal
            editType={editTask}
            deleteType={openDeleteModal}
            type="Task"
          />
        )}
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
