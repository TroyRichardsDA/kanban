import { ReactComponent as ChevronDown } from "../../assets/icon-chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../assets/icon-chevron-up.svg";
import { ReactComponent as Ellipsis } from "../../assets/icon-vertical-ellipsis.svg";
import { ReactComponent as MobileLogo } from "../../assets/logo-mobile.svg";
import { ReactComponent as Plus } from "../../assets/icon-add-task-mobile.svg";
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
    <nav className="header_container">
      <div className="header_left">
        <MobileLogo />
        <div onClick={toggleAllBoards}>
          <h2>{currentBoard.name}</h2>
          {allBoardsModalIsOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>
      <div className="header_right">
        <button
          onClick={() => dispatch(toggleTaskEditor(true))}
          disabled={noColumns ? true : false}
          className={noColumns ? "dimmed" : ""}
        >
          <Plus />
        </button>
        <Ellipsis onClick={() => dispatch(toggleBoardMiniModal())} />
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
