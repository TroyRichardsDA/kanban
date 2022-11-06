import { ITask } from "../../models/ITask";
import Task from "../Task/Task";
import { useAppSelector } from "../../context/hooks";

interface Props {
  name: string;
  tasks?: ITask[];
}

const Column = (props: Props) => {
  const { boards } = useAppSelector((state) => state.boards);
  const { name, tasks } = props;
  const currentBoard = boards.find((board) => board.isCurrent)!;

  function colorGen() {
    const currentColumn = currentBoard.columns.find(
      (column) => column.name === name
    )!;
    const index = currentBoard.columns.indexOf(currentColumn);

    if (index === 0) {
      return "#49C4E5";
    } else if (index === 1) {
      return "#635fc7";
    } else {
      return "#67E2AE";
    }
  }

  return (
    <section className="column_container">
      <div className="column_header">
        <div
          className="column_circle"
          style={{ backgroundColor: colorGen() }}
        ></div>
        <h2 className="column_title">
          {name} {!tasks ? "" : `(${tasks?.length})`}{" "}
        </h2>
      </div>
      <div className="column_tasks">
        {tasks?.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default Column;
