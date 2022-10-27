import Cross from "../../assets/icon-cross.svg";
import styles from "./EditableList.module.scss";

interface Props {
  id: string;
  text: string;
  placeholder?: string;
  updateText: (e: string) => void;
  remove: (e: string) => void;
}

const EditableList = (props: Props) => {
  const { text, id, placeholder } = props;
  const { updateText, remove } = props;

  return (
    <div className={styles.item}>
      <input
        value={text}
        onChange={(e) => updateText(e.target.value)}
        type="text"
        placeholder={placeholder ? placeholder : ""}
      />
      <img onClick={() => remove(id)} src={Cross} alt="An X" />
    </div>
  );
};

export default EditableList;
