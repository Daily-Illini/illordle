import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="grid place-items-center">
      <h1 className="m-2 font-bold text-2xl">Illordle</h1>
      <Board word={"illini"} />
    </div>
  );
}

export default App;
