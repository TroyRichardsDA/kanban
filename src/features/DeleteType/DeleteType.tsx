import Modal from "../../components/Modals/Modal";

interface Props {
  type: "task" | "board";
  title: any;
  deleteThisItem: () => void;
  dontDelete: () => void;
}

const DeleteType = (props: Props) => {
  const { type, title } = props;
  const { deleteThisItem, dontDelete } = props;

  function fillerText() {
    if (type === "board") {
      return "board? This action will remove all columns and tasks and cannot be reversed.";
    } else {
      return "task and its subtasks? This action cannot be reversed.";
    }
  }

  return (
    <Modal>
      <h3 className="delete-type_title">Delete this {type}?</h3>
      <p className="delete-type_text">
        Are you sure you want to delete the '{title || title.text!}'{" "}
        {fillerText()}
      </p>

      <div className="delete-type_btns-container">
        <button className="delete-type_delete" onClick={() => deleteThisItem()}>
          Delete
        </button>
        <button className="delete-type_cancel" onClick={() => dontDelete()}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default DeleteType;
