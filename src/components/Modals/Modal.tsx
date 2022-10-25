import { ReactNode } from "react";
import styles from "./Modal.module.scss";

type Props = {
  children: ReactNode;
};

function Modal({ children }: Props) {
  return (
    <div className={styles.modalBg}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
}

export default Modal;
