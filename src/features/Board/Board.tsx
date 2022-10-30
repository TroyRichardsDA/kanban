import { addColumnToBoard } from "../../context/boards";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import Column from "../../components/Column/Column";
import Modal from "../../components/Modals/Modal";
import styles from "./Board.module.scss";
import { ReactComponent as BoardIcon } from "../../assets/icon-board.svg";

const Board = () => {
  const { boards } = useAppSelector((state) => state.boards);

  const currentBoard = boards.find((board) => board.isCurrent === true)!;
  const boardColumnsLength = currentBoard.columns.length;
  const dispatch = useAppDispatch();

  function addtoColumns() {
    dispatch(addColumnToBoard());
  }

  const allBoards = boards.map((board) => (
    <div
      className={`${styles.singleBoard} ${
        board.isCurrent && styles.currentBoard
      }`}
    >
      <BoardIcon />
      <p>{board.name}</p>
    </div>
  ));

  return (
    <main className={boardColumnsLength > 0 ? styles.board : ""}>
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

      <div className={styles.allBoards}>
        <Modal isAllBoardsModal={true}>
          <h3>All boards</h3>
          <div>{allBoards}</div>
        </Modal>
      </div>
    </main>
  );
};

export default Board;
