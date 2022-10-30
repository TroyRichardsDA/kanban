import "./App.scss";
import Header from "./features/Header/Header";
import Board from "./features/Board/Board";
import { useAppDispatch, useAppSelector } from "./context/hooks";
import DeleteType from "./features/DeleteType/DeleteType";
import TaskEditor from "./features/TaskEditor/TaskEditor";
import { resetModalsSlice, toggleDeleteModal } from "./context/modals";
import { deleteBoard, deleteTask } from "./context/boards";

function App() {
  const { taskEditorIsOpen } = useAppSelector((state) => state.modals);
  const { deleteTypeIsOpen, passedData } = useAppSelector(
    (state) => state.modals
  );
  const dispatch = useAppDispatch();

  function typeCheck() {
    if (passedData.subtasks) {
      return "task";
    } else {
      return "board";
    }
  }

  function deleteThisItem() {
    dispatch(toggleDeleteModal(false));

    if (typeCheck() === "task") {
      dispatch(deleteTask({ task: passedData, status: passedData.status }));
    } else {
      dispatch(deleteBoard(passedData));
    }

    dispatch(resetModalsSlice());
  }

  function dontDelete() {
    dispatch(toggleDeleteModal(false));
    dispatch(resetModalsSlice());
  }

  return (
    <div className="App">
      <Header />
      <Board />
      {deleteTypeIsOpen && (
        <DeleteType
          dontDelete={dontDelete}
          deleteThisItem={deleteThisItem}
          title={passedData.title || passedData.name}
          type={typeCheck()}
        />
      )}

      {taskEditorIsOpen && <TaskEditor />}
    </div>
  );
}

export default App;
