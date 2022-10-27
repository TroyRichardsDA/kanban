import { ReactNode } from "react";
import styles from "./Modal.module.scss";

type Props = {
  children: ReactNode;
  toggle: () => void;
};

function Modal(props: Props) {
  const { children, toggle } = props;

  function preventChild(e: any) {
    e.stopPropagation();
  }

  return (
    <div onClick={toggle} className={styles.modalBg}>
      <div onClick={(e) => preventChild(e)} className={styles.modal}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
