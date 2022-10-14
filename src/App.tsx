import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./features/Header/Header";
import AddTask from "./features/AddTask/AddTask";
import { useAppSelector } from "./context/hooks";

function App() {
  const { isOpen } = useAppSelector((state) => state.tasks);

  return (
    <div className="App">
      <Header />
      {isOpen && <AddTask />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
