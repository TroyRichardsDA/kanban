import ChevronDown from "../../assets/icon-chevron-down.svg";
import MobileLogo from "../../assets/logo-mobile.svg";
import Ellipsis from "../../assets/icon-vertical-ellipsis.svg";
import Plus from "../../assets/icon-add-task-mobile.svg";
import styles from "./Navbar.module.scss";
type Props = {};

function Navbar({}: Props) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__left}>
        <img src={MobileLogo} alt="" />
        <div>
          <h2>Platform Launch</h2>
          <img src={ChevronDown} alt="arrow down" />
        </div>
      </div>
      <div className={styles.navbar__right}>
        <button className="">
          <img src={Plus} alt="" />
        </button>
        <img src={Ellipsis} alt="" />
      </div>
    </nav>
  );
}

export default Navbar;
