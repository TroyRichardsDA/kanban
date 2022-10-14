import ChevronDown from "../../assets/icon-chevron-down.svg";
import MobileLogo from "../../assets/logo-mobile.svg";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import Plus from "../../assets/icon-add-task-mobile.svg";
import styles from "./Header.module.scss";

function Header() {
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
        <button className="">
          <img src={Plus} alt="" />
        </button>
        <img src={Ellipsis} alt="" />
      </div>
    </nav>
  );
}

export default Header;
