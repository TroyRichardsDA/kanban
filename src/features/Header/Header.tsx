import ChevronDown from "../../assets/icon-chevron-down.svg";
import MobileLogo from "../../assets/logo-mobile.svg";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import Plus from "../../assets/icon-add-task-mobile.svg";
import styles from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { toggleTaskEditor } from "../../context/modals";

function Header() {
  const { boards } = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();
  const currentBoard = boards.find((board) => board.isCurrent)!;
  const noColumns = currentBoard.columns.length === 0;

  return (
    <nav className={styles.header}>
      <div className={styles.header__left}>
        <img src={MobileLogo} alt="" />
        <div>
          <h2>Platform Launch</h2>
          <img src={ChevronDown} alt="arrow down" />
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
        <img className={styles.ellipsis} src={Ellipsis} alt="" />
      </div>
    </nav>
  );
}

export default Header;
