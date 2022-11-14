import { ReactComponent as Ellipsis } from "../../assets/icon-vertical-ellipsis.svg";
import MiniModal from "../../components/MiniModal/MiniModal";
import Modal from "../../components/Modals/Modal";
import StatusSelection from "../../components/StatusSelection/StatusSelection";
import {
  changeTaskStatus,
  editTask,
  toggleTaskStatusList,
  updateSubTaskIsComplete,
} from "../../context/boards";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  populatePassedData,
  resetPassedData,
  toggleDeleteModal,
  toggleTaskEditor,
  toggleTaskMiniModal,
  toggleViewTask,
  updateSubTask,
} from "../../context/modals";
import { ISubTask } from "../../models/ISubtask";

function ViewTask() {
  const { passedData } = useAppSelector((state) => state.modals);
  const { title, subtasks, description, status, statusListIsOpen } = passedData;
  const { taskMiniModalIsOpen } = useAppSelector((state) => state.modals);
  const dispatch = useAppDispatch();

  const currentBoardColumns = useAppSelector(
    (state) => state.boards
  ).boards.find((board) => board.isCurrent)?.columns!;

  const subtasksComplete = subtasks.filter(
    (subtask: ISubTask) => subtask.isCompleted
  ).length;

  const subtasksList = subtasks.map((subtask: ISubTask, id: string) => {
    const { isCompleted } = subtask;

    function updateCompleted(e: any) {
      if (e.target.checked) {
        dispatch(
          updateSubTask({
            id: subtask.id,
            bool: true,
          })
        );
      } else {
        dispatch(
          updateSubTask({
            id: subtask.id,
            bool: false,
          })
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
    dispatch(toggleViewTask(false));
    dispatch(editTask({ task: passedData, status: passedData.status }));
    dispatch(resetPassedData());
  }

  function changeStatus(newStatus: string) {
    if (newStatus !== status) {
      dispatch(changeTaskStatus({ newStatus, prev: status, passedData }));
    }
  }

  function toggleStatusList() {
    dispatch(toggleTaskStatusList({ passedData, status }));
  }

  function openDeleteModal() {
    dispatch(toggleTaskMiniModal());
    dispatch(toggleDeleteModal(true));
    dispatch(editTask({ task: passedData, status: passedData.status }));
    dispatch(populatePassedData(passedData));
    dispatch(toggleViewTask(false));
  }

  function openEditTask() {
    dispatch(toggleTaskMiniModal());
    dispatch(toggleTaskEditor(true));
    dispatch(editTask({ task: passedData, status: passedData.status }));
    dispatch(populatePassedData(passedData));
    dispatch(toggleViewTask(false));
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
