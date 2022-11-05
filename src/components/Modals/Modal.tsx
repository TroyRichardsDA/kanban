import { ReactNode } from "react";
import { useAppSelector } from "../../context/hooks";
import styles from "./Modal.module.scss";

type Props = {
  children: ReactNode;
  isAllBoardsModal?: boolean;
  toggle?: () => void;
};

function Modal(props: Props) {
  const { children, isAllBoardsModal } = props;
  const { isDarkMode } = useAppSelector((state) => state.theme);
  const { toggle } = props;

  function preventChild(e: any) {
    e.stopPropagation();
  }

  const position = isAllBoardsModal ? "start" : "center";
  const modalWidth = isAllBoardsModal ? "264px" : "343px";

  return (
    <div
      style={{ alignItems: position }}
      onClick={toggle}
      className={styles.modalBg}
    >
      <div
        style={{ width: modalWidth }}
        onClick={(e) => preventChild(e)}
        className={`${styles.modal} ${isDarkMode ? "dark" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
