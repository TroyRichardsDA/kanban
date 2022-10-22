import { ITask } from "../../models/ITask";
import styles from "./Column.module.scss";
import Task from "../Task/Task";

interface Props {
  name: string;
  tasks?: ITask[];
}

const Column = (props: Props) => {
  const { name, tasks } = props;
  const backgroundColor =
    name === "Todo" ? "#49C4E5" : name === "Doing" ? "$primary" : "#67E2AE";

  return (
    <section>
      <div className={styles.header}>
        <div style={{ backgroundColor }} className={styles.circle}></div>
        <h2 className={styles.title}>
          {name} {!tasks ? "" : `(${tasks?.length})`}{" "}
        </h2>
      </div>
      <div className={styles.tasks}>
        {tasks?.map((task, id) => (
          <Task key={id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default Column;
