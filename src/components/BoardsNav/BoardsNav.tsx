import { useAppDispatch, useAppSelector } from "../../context/hooks";
import styles from "./BoardsNav.module.scss";
import { ReactComponent as BoardIcon } from "../../assets/icon-board.svg";
import { ReactComponent as LightTheme } from "../../assets/icon-light-theme.svg";
import { ReactComponent as DarkTheme } from "../../assets/icon-dark-theme.svg";
import Modal from "../Modals/Modal";
import { toggleAllBoardsModal, toggleBoardsEditor } from "../../context/modals";

type Props = {};

const BoardsNav = (props: Props) => {
  const { boards } = useAppSelector((state) => state.boards);

  const dispatch = useAppDispatch();

  function openBoardsEditor(e: any) {
    e.preventDefault();
    dispatch(toggleAllBoardsModal());
    dispatch(toggleBoardsEditor(true));
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
    <div className={styles.allBoards}>
      <Modal isAllBoardsModal={true}>
        <div className={styles.row}>
          <h3>All boards ({boards.length}) </h3>
          <div className={styles.boards_list}>
            {allBoards}
            <div className={styles.createNew_container}>
              <BoardIcon />
              <button
                className={styles.btn}
                onClick={(e) => openBoardsEditor(e)}
              >
                + Create New Board
              </button>
            </div>
          </div>

          <div className={styles.theme_switcher}>
            <LightTheme />

            <label className={styles.switch}>
              <input type="checkbox" />
              <span></span>
            </label>
            <DarkTheme />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BoardsNav;
