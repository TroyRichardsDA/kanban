import Header from "./features/Header/Header";
import Board from "./features/Board/Board";
import { useAppDispatch, useAppSelector } from "./context/hooks";
import DeleteType from "./features/DeleteType/DeleteType";
import TaskEditor from "./features/TaskEditor/TaskEditor";
import { resetModalsSlice, toggleDeleteModal } from "./context/modals";
import { deleteBoard, deleteTask } from "./context/boards";
import BoardsEditor from "./features/BoardsEditor/BoardsEditor";
import Sidebar from "./features/Sidebar/Sidebar";
import ViewTask from "./features/ViewTask/ViewTask";

function App() {
  const {
    taskEditorIsOpen,
    boardsEditorIsOpen,
    sideBarIsOpen,
    viewTaskIsOpen,
  } = useAppSelector((state) => state.modals);
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
      dispatch(deleteBoard());
    }

    dispatch(resetModalsSlice());
  }

  function dontDelete() {
    dispatch(toggleDeleteModal(false));
    dispatch(resetModalsSlice());
  }

  return (
    <div className={`app`}>
      {sideBarIsOpen && <Sidebar />}
      <div className="app_main-content">
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
        {viewTaskIsOpen && <ViewTask />}
        {taskEditorIsOpen && <TaskEditor />}
        {boardsEditorIsOpen && <BoardsEditor />}
      </div>
    </div>
  );
}

export default App;
