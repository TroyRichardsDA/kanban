import { ReactComponent as ChevronDown } from "../../assets/icon-chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../assets/icon-chevron-up.svg";
import MobileLogo from "../../assets/logo-mobile.svg";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import Plus from "../../assets/icon-add-task-mobile.svg";
import styles from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import {
  populatePassedData,
  toggleAllBoardsModal,
  toggleBoardMiniModal,
  toggleBoardsEditor,
  toggleDeleteModal,
  toggleTaskEditor,
} from "../../context/modals";
import MiniModal from "../../components/MiniModal/MiniModal";

function Header() {
  const { boards } = useAppSelector((state) => state.boards);
  const { boardMiniModalIsOpen, allBoardsModalIsOpen } = useAppSelector(
    (state) => state.modals
  );
  const currentBoard = boards.find((board) => board.isCurrent)!;
  const noColumns = currentBoard.columns.length === 0;
  const dispatch = useAppDispatch();

  function toggleAllBoards() {
    dispatch(toggleAllBoardsModal());
  }

  function deleteBoard() {
    dispatch(toggleDeleteModal(true));
    dispatch(toggleBoardMiniModal());
    dispatch(populatePassedData(currentBoard));
  }

  function editBoard() {
    dispatch(toggleBoardsEditor(true));
    dispatch(toggleBoardMiniModal());
    dispatch(populatePassedData(currentBoard));
  }

  return (
    <nav className={styles.header}>
      <div className={styles.header__left}>
        <img src={MobileLogo} alt="" />
        <div className={styles.board_name} onClick={toggleAllBoards}>
          <h2>{currentBoard.name}</h2>
          {allBoardsModalIsOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      <div className={styles.header__right}>
        <button
          onClick={() => dispatch(toggleTaskEditor(true))}
          disabled={noColumns ? true : false}
          className={noColumns ? styles.dimmed : ""}
        >
          <img src={Plus} alt="" />
        </button>
        <img
          onClick={() => dispatch(toggleBoardMiniModal())}
          className={styles.ellipsis}
          src={Ellipsis}
          alt=""
        />
        {boardMiniModalIsOpen && (
          <MiniModal
            type="Board"
            deleteType={deleteBoard}
            editType={editBoard}
          />
        )}
      </div>
    </nav>
  );
}

export default Header;
