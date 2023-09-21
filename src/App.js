import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="grid place-items-center">
      <h1>Illordle</h1>
      <Board word={"illini"} />
    </div>
  );
}

export default App;
