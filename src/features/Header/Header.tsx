import { ReactComponent as ChevronDown } from "../../assets/icon-chevron-down.svg";
import { ReactComponent as ChevronUp } from "../../assets/icon-chevron-up.svg";
import { ReactComponent as Ellipsis } from "../../assets/icon-vertical-ellipsis.svg";
import { ReactComponent as MobileLogo } from "../../assets/logo-mobile.svg";
import { ReactComponent as Plus } from "../../assets/icon-add-task-mobile.svg";
import { ReactComponent as DarkLogo } from "../../assets/logo-light.svg";
import { ReactComponent as LightLogo } from "../../assets/logo-dark.svg";
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
  const { boardMiniModalIsOpen, allBoardsModalIsOpen, sideBarIsOpen } =
    useAppSelector((state) => state.modals);
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const currentBoard = boards.find((board) => board.isCurrent)!;
  const noColumns = currentBoard.columns.length === 0;
  const dispatch = useAppDispatch();

  function toggleAllBoards() {
    if (window.innerWidth < 768) {
      dispatch(toggleAllBoardsModal());
    }
  }

  function deleteBoard() {
    dispatch(toggleBoardMiniModal());
    dispatch(toggleDeleteModal(true));
    dispatch(populatePassedData(currentBoard));
  }

  function editBoard() {
    dispatch(toggleBoardsEditor(true));
    dispatch(toggleBoardMiniModal());
    dispatch(populatePassedData(currentBoard));
  }

  return (
    <div className="header">
      {!sideBarIsOpen && (
        <div className="header_logo">
          {!isDarkMode ? <LightLogo /> : <DarkLogo />}
        </div>
      )}
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
            <Plus /> <span>+ Add New Task</span>
          </button>
          <Ellipsis
            className="header_ellipsis"
            onClick={() => dispatch(toggleBoardMiniModal())}
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
    </div>
  );
}

export default Header;
