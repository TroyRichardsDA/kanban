import { addColumnToBoard } from "../../context/boards";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import Column from "../../components/Column/Column";
import styles from "./Board.module.scss";
import DeleteType from "../DeleteType/DeleteType";
type Props = {};

const Board = (props: Props) => {
  const { boards } = useAppSelector((state) => state.boards);
  const currentBoard = boards.find((board) => board.isCurrent === true)!;
  const boardColumnsLength = currentBoard.columns.length;

  const dispatch = useAppDispatch();

  function addtoColumns() {
    dispatch(addColumnToBoard());
  }

  return (
    <main className={boardColumnsLength > 0 ? styles.board : ""}>
      {boardColumnsLength > 0 &&
        currentBoard.columns.map(({ id, name, tasks }) => (
          <Column key={id} name={name} tasks={tasks} />
        ))}
      {boardColumnsLength === 0 && (
        <div className={styles.empty}>
          <p>This board is empty. Create a new column to get started.</p>
          <button onClick={() => addtoColumns()}> + Add New Column </button>
        </div>
      )}
      <div onClick={() => addtoColumns()} className={styles.new_column}>
        <p>+ New Column</p>
      </div>
    </main>
  );
};

export default Board;
