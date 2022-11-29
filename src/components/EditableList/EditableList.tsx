import { ReactComponent as Cross } from "../../assets/icon-cross.svg";

interface Props {
  id: string;
  text: string;
  placeholder?: string;
  visited?: boolean;
  onBlur?: (id: string) => void;
  updateText: (e: string) => void;
  remove: (e: string) => void;
}

const EditableList = (props: Props) => {
  const { text, id, placeholder, visited } = props;
  const { updateText, remove, onBlur } = props;

  return (
    <label className="editable-list_item">
      <input
        value={text}
        onChange={(e) => updateText(e.target.value)}
        type="text"
        placeholder={placeholder ? placeholder : ""}
        data-visited={visited!}
        onBlur={() => onBlur!(id)}
        minLength={1}
        required
      />
      <Cross onClick={() => remove(id)} />
      <span>Can't be empty</span>
    </label>
  );
};

export default EditableList;
