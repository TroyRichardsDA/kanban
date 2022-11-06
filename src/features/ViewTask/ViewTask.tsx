import { ReactComponent as Ellipsis } from "../../assets/icon-vertical-ellipsis.svg";
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
  populatePassedData,
  toggleDeleteModal,
  toggleTaskEditor,
  toggleTaskMiniModal,
} from "../../context/modals";
import { ITask } from "../../models/ITask";

interface Props {
  task: ITask;
}

function ViewTask(props: Props) {
  const { task } = props;
  const { title, subtasks, description, status, statusListIsOpen } = task;
  const { taskMiniModalIsOpen } = useAppSelector((state) => state.modals);
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
      <div className="view-task_subtask" key={id}>
        <input
          onChange={(e) => updateCompleted(e)}
          type="checkbox"
          checked={isCompleted}
          className="view-task_checkbox"
        />
        <label className={`${isCompleted && "view-task_completed"}`}>
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
    dispatch(populatePassedData(task));
    closeModal();
  }

  function openEditTask() {
    dispatch(populatePassedData(task));
    dispatch(toggleTaskEditor(true));
    closeModal();
  }

  function openMiniModal() {
    dispatch(toggleTaskMiniModal());
  }

  return (
    <Modal toggle={closeModal}>
      <div className="view-task_header">
        <h2 className="view-task_title">{title}</h2>
        <Ellipsis onClick={openMiniModal} />
        {taskMiniModalIsOpen && (
          <MiniModal
            editType={openEditTask}
            deleteType={openDeleteModal}
            type="Task"
          />
        )}
      </div>
      <p className="view-task_description">{description}</p>
      <div>
        <h3 className="view-task_subtitle">
          Subtasks ({subtasksComplete} of {subtasks.length})
        </h3>
        <div className="view-task_subtasks">{subtasksList}</div>
      </div>
      <div className="view-task_status">
        <h3 className="view-task_subtitle">Current Status</h3>
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
