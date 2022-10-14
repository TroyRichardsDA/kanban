import { addColumn } from "../../context/columns";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import Column from "../../features/Column/Column";
import styles from "./Home.module.scss";

export default function Home() {
  const { columns } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();

  function addtoColumns() {
    dispatch(addColumn());
  }

  return (
    <main className={columns.length > 0 ? styles.home : ""}>
      {columns.length > 0 &&
        columns.map(({ name, tasks }) => <Column name={name} tasks={tasks} />)}

      {columns.length === 0 && (
        <div className={styles.empty}>
          <p>This board is empty. Create a new column to get started.</p>
          <button onClick={() => addtoColumns()}> + Add New Column </button>
        </div>
      )}
    </main>
  );
}
