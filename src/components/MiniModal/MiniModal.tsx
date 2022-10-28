import styles from "./MiniModal.module.scss";
interface Props {
  type: string;
  deleteType: () => void;
  editType: () => void;
}

const MiniModal = (props: Props) => {
  const { type } = props;
  const { deleteType } = props;

  return (
    <div className={styles.modalBG}>
      <p className={styles.edit}>Edit {type}</p>
      <p onClick={() => deleteType()} className={styles.delete}>
        Delete {type}
      </p>
    </div>
  );
};

export default MiniModal;
