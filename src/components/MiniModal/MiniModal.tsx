import styles from "./MiniModal.module.scss";
interface Props {
  type: "Task" | "Board";
  deleteType: () => void;
  editType: () => void;
}

const MiniModal = (props: Props) => {
  const { type } = props;
  const { deleteType, editType } = props;

  const position =
    type === "Task"
      ? { top: "34px", right: "-34px" }
      : { top: "40px", right: "-4px" };

  return (
    <div style={position} className={styles.modalBG}>
      <p onClick={editType} className={styles.edit}>
        Edit {type}
      </p>
      <p onClick={deleteType} className={styles.delete}>
        Delete {type}
      </p>
    </div>
  );
};

export default MiniModal;
