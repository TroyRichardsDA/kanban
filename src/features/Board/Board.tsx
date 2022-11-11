import { ReactComponent as Show } from "../../assets/icon-show-sidebar.svg";
import { addColumnToBoard } from "../../context/boards";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import Column from "../../components/Column/Column";
import MobileBoardsNav from "../MobileBoardsNav/MobileBoardsNav";
import { toggleSideBar } from "../../context/modals";

const Board = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const { allBoardsModalIsOpen, sideBarIsOpen } = useAppSelector(
    (state) => state.modals
  );
  const currentBoard = boards.find((board) => board.isCurrent)!;
  const boardColumnsLength = currentBoard.columns.length;
  const dispatch = useAppDispatch();

  function addtoColumns() {
    dispatch(addColumnToBoard());
  }

  function openSidebar(e: any) {
    dispatch(toggleSideBar(true));
  }

  return (
    <main
      className={`board_container ${boardColumnsLength === 0 && "board_empty"}`}
    >
      {boardColumnsLength === 0 && (
        <div className="board_empty--content">
          <p>This board is empty. Create a new column to get started.</p>
          <button onClick={() => addtoColumns()}> + Add New Column </button>
        </div>
      )}

      <>
        {boardColumnsLength > 0 && (
          <>
            {currentBoard.columns.map(({ id, name, tasks }) => (
              <Column key={id} name={name} tasks={tasks} />
            ))}
            <div className="board_new-column" onClick={() => addtoColumns()}>
              <p>+ New Column</p>
            </div>
          </>
        )}
      </>
      {!sideBarIsOpen && (
        <button onClick={(e) => openSidebar(e)} className="board_show-sidebar">
          <Show />
        </button>
      )}
      {allBoardsModalIsOpen && <MobileBoardsNav />}
    </main>
  );
};

export default Board;
