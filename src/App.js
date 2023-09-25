import { useState } from "react";
import "./App.css";
import Board from "./components/Board";
import GameStateModal from "./components/GameStateModal";

function App() {
  const [gameWin, setGameWin] = useState(false);
  const [gameLose, setGameLose] = useState(false);

  function winGame() {
    setGameWin(true);
  }

  function loseGame() {
    setGameLose(true);
  }

  return (
    <div className="grid place-items-center">
      {(gameWin || gameLose) && <GameStateModal didWin={gameWin} />}

      <h1 className="m-2 font-bold text-2xl">Illordle</h1>
      <Board word={"illini"} win={winGame} lose={loseGame} />
    </div>
  );
}

export default App;
