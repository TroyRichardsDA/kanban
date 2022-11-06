import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { ReactComponent as BoardIcon } from "../../assets/icon-board.svg";
import { ReactComponent as LightTheme } from "../../assets/icon-light-theme.svg";
import { ReactComponent as DarkTheme } from "../../assets/icon-dark-theme.svg";
import Modal from "../Modals/Modal";
import { toggleAllBoardsModal, toggleBoardsEditor } from "../../context/modals";
import { changeBoard } from "../../context/boards";
import { toggleDarkMode } from "../../context/theme";

const BoardsNav = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const currentTheme = !isDarkMode ? { left: "10%" } : { left: "55%" };

  function openBoardsEditor(e: any) {
    e.preventDefault();
    dispatch(toggleAllBoardsModal());
    dispatch(toggleBoardsEditor(true));
  }

  function changeCurrentBoard(boardID: string, isCurrent: boolean) {
    if (!isCurrent) {
      dispatch(changeBoard(boardID));
    }
  }

  function toggleTheme() {
    dispatch(toggleDarkMode());
  }

  const allBoards = boards.map((board) => (
    <div
      key={board.id}
      className={`boards-nav_board-name ${
        board.isCurrent && "boards-nav_current"
      }`}
    >
      <BoardIcon />
      <p onClick={() => changeCurrentBoard(board.id, board.isCurrent)}>
        {board.name}
      </p>
    </div>
  ));

  return (
    <div className="boards-nav_container">
      <Modal isAllBoardsModal={true}>
        <div>
          <h3>All boards ({boards.length}) </h3>
          <div className="boards-nav_list">
            {allBoards}
            <div className="boards-nav_list--create-new">
              <BoardIcon />
              <button onClick={(e) => openBoardsEditor(e)}>
                + Create New Board
              </button>
            </div>
          </div>

          <div className="boards-nav_theme-switcher">
            <LightTheme />

            <label>
              <input onClick={() => toggleTheme()} type="checkbox" />
              <span style={currentTheme}></span>
            </label>
            <DarkTheme />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BoardsNav;
