import ChevronDown from "../../assets/icon-chevron-down.svg";
import MobileLogo from "../../assets/logo-mobile.svg";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import Plus from "../../assets/icon-add-task-mobile.svg";
import styles from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../context/hooks";
import { openAddNewTask } from "../../context/tasks";

function Header() {
  const { columns } = useAppSelector((state) => state.columns);
  const dispatch = useAppDispatch();
  const colsEmpty = columns.length === 0;

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
          onClick={() => dispatch(openAddNewTask())}
          disabled={colsEmpty ? true : false}
          className={colsEmpty ? styles.dimmed : ""}
        >
          <img src={Plus} alt="" />
        </button>
        <img className={styles.ellipsis} src={Ellipsis} alt="" />
      </div>
    </nav>
  );
}

export default Header;
