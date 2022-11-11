import { useDispatch } from "react-redux";
import { ReactComponent as Hide } from "../../assets/icon-hide-sidebar.svg";
import { ReactComponent as Logo } from "../../assets/logo-dark.svg";
import { ReactComponent as DarkLogo } from "../../assets/logo-light.svg";
import BoardsNav from "../../components/BoardsNav/BoardsNav";
import { useAppSelector } from "../../context/hooks";
import { toggleSideBar } from "../../context/modals";

const Sidebar = () => {
  const { isDarkMode } = useAppSelector((state) => state.theme);

  const dispatch = useDispatch();

  function closeSideBar() {
    dispatch(toggleSideBar(false));
  }

  return (
    <div className="sidebar">
      {isDarkMode ? <DarkLogo /> : <Logo />}
      <div className="sidebar-content">
        <BoardsNav />
      </div>
      <button onClick={closeSideBar} className="sidebar_hide">
        <Hide /> Hide Sidebar
      </button>
    </div>
  );
};

export default Sidebar;
