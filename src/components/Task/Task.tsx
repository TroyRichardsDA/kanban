import { useAppDispatch } from "../../context/hooks";
import { populatePassedData, toggleViewTask } from "../../context/modals";
import ViewTask from "../../features/ViewTask/ViewTask";
import { ITask } from "../../models/ITask";

type Props = {
  task: ITask;
};

function Task(props: Props) {
  const { task } = props;
  const { title, subtasks, viewTask } = task;
  const dispatch = useAppDispatch();

  const subtasksComplete = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  function openTask() {
    dispatch(toggleViewTask(true));
    dispatch(populatePassedData(task));
  }

  function preventChild(e: any) {
    e.stopPropagation();
  }

  return (
    <div onClick={() => openTask()} className="task_container">
      <h3 className="task_title">{title}</h3>
      <p className="task_subtasks">
        {subtasksComplete} of {subtasks.length} subtasks
      </p>
      <div onClick={(e) => preventChild(e)}>{viewTask && <ViewTask />}</div>
    </div>
  );
}

export default Task;
