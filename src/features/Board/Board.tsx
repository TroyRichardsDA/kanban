import { addColumnToBoard } from "../../context/boards";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import Column from "../../components/Column/Column";
import styles from "./Board.module.scss";
import BoardsNav from "../../components/BoardsNav/BoardsNav";

const Board = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const { allBoardsModalIsOpen } = useAppSelector((state) => state.modals);
  const currentBoard = boards.find((board) => board.isCurrent)!;
  const boardColumnsLength = currentBoard.columns.length;
  const dispatch = useAppDispatch();

  function addtoColumns() {
    dispatch(addColumnToBoard());
  }

  return (
    <main
      className={`${styles.board} ${
        boardColumnsLength === 0 && styles.no_items
      }`}
    >
      <>
        {boardColumnsLength > 0 && (
          <>
            {currentBoard.columns.map(({ id, name, tasks }) => (
              <Column key={id} name={name} tasks={tasks} />
            ))}
            <div onClick={() => addtoColumns()} className={styles.new_column}>
              <p>+ New Column</p>
            </div>
          </>
        )}
      </>

      {boardColumnsLength === 0 && (
        <div className={styles.empty}>
          <p>This board is empty. Create a new column to get started.</p>
          <button onClick={() => addtoColumns()}> + Add New Column </button>
        </div>
      )}

      {allBoardsModalIsOpen && <BoardsNav />}
    </main>
  );
};

export default Board;
