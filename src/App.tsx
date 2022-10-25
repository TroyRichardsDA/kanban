import "./App.scss";
import Header from "./features/Header/Header";
import AddTask from "./features/AddTask/AddTask";
import { useAppSelector } from "./context/hooks";
import Board from "./features/Board/Board";
import ViewTask from "./features/ViewTask/ViewTask";

function App() {
  const { addTaskIsOpen } = useAppSelector((state) => state.modals);

  return (
    <div className="App">
      <Header />
      {addTaskIsOpen && <AddTask />}
      <Board />
    </div>
  );
}

export default App;
