import Modal from "../../components/Modals/Modal";
import styles from "./DeleteType.module.scss";

interface Props {
  type: "task" | "board";
  title: string;
}

const DeleteType = (props: Props) => {
  const { type, title } = props;

  function fillerText() {
    if (type === "board") {
      return "board? This action will remove all columns and tasks and cannot be reversed.";
    } else {
      return "task and its subtasks? This action cannot be reversed.";
    }
  }

  return (
    <Modal>
      <h3 className={styles.header}>Delete this {type}?</h3>
      <p className={styles.text}>
        Are you sure you want to delete the '{title}' {fillerText()}
      </p>

      <div className={styles.btns_container}>
        <button className={styles.delete}>Delete</button>
        <button className={styles.cancel}>Cancel</button>
      </div>
    </Modal>
  );
};

export default DeleteType;
