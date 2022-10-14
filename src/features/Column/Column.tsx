import React from "react";
import Card from "../../components/Card/Card";
import { Task } from "../../models/Task";
import styles from "./Column.module.scss";

interface Props {
  name: string;
  tasks?: Task[];
}

const Column = (props: Props) => {
  const { name, tasks } = props;
  const backgroundColor =
    name === "todo" ? "#49C4E5" : name === "doing" ? "$primary" : "#67E2AE";

  return (
    <section>
      <div className={styles.title}>
        <div style={{ backgroundColor }} className={styles.circle}></div>
        <h2>
          {name} {!tasks ? "" : `(${tasks?.length})`}{" "}
        </h2>
      </div>
      <div>
        {tasks?.map((task) => (
          <Card />
        ))}
      </div>
    </section>
  );
};

export default Column;
