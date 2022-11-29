import { useAppDispatch } from "../../context/hooks";
import { populatePassedData, toggleViewTask } from "../../context/modals";
import ViewTask from "../../features/ViewTask/ViewTask";
import { ITask } from "../../models/ITask";

type Props = {
  task: ITask;
};

function Task(props: Props) {
  const { task } = props;
  const { title, subtasks } = task;
  const dispatch = useAppDispatch();

  const subtasksComplete = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;

  function openTask() {
    dispatch(toggleViewTask(true));
    dispatch(populatePassedData(task));
  }

  return (
    <div onClick={() => openTask()} className="task_container">
      <h3 className="task_title">{title.text}</h3>
      <p className="task_subtasks">
        {subtasksComplete} of {subtasks.length} subtasks
      </p>
    </div>
  );
}

export default Task;
