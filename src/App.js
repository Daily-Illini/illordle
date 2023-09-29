import { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import Keyboard from "react-simple-keyboard";
import GameStateModal from "./components/GameStateModal";
import {
  GameState,
  initializeBoardState,
  hasCorrectGuess,
  getCurrentWord,
  validateWord,
} from "./utils";

function App() {
  const word = "illini";
  const [guessNumber, setGuessNumber] = useState(0);
  const [gameState, setGameState] = useState(GameState.InSession);
  const [styleState, setStyleState] = useState(initializeBoardState(word));
  const [guessState, setGuessState] = useState(initializeBoardState(word));

  const onKeyPress = (button) => {
    let formattedBtn = button;
    if (button === "{Backspace}") formattedBtn = "Backspace";
    if (button === "{Enter}") formattedBtn = "Enter";

    const input = {
      key: formattedBtn,
    };
    onClickDown(input);
  };

  const submitWord = () => {
    const currentWord = getCurrentWord(guessState, guessNumber);
    const ans = [];
    const seen = new Set();

    for (let i = 0; i < word.length; i++) {
      if (word[i].toUpperCase() === currentWord[i].toUpperCase())
        ans.push("bg-correct text-white");
      else if (seen.has(currentWord[i].toUpperCase()))
        ans.push("bg-exist text-white");
      else ans.push("bg-wrong bg-gray-600");

      seen.add(word[i].toUpperCase());
    }

    const tmp = [...styleState];
    tmp[guessNumber] = ans;

    setStyleState(tmp);
  };

  const handleEnter = () => {
    if (
      validateWord(getCurrentWord(guessState, guessNumber), guessNumber, word)
    ) {
      submitWord();
      if (hasCorrectGuess(word, guessState, guessNumber)) {
        setGameState(GameState.Win);
      }
      if (
        guessNumber >= word.length &&
        !hasCorrectGuess(word, guessState, guessNumber)
      ) {
        setGameState(GameState.Lose);
      }
      setGuessNumber(guessNumber + 1);
    }
  };

  const handleAddLetter = (letter, currWord, wordLength) => {
    if (currWord.length < wordLength) {
      let tmp = [...guessState];
      for (let i = 0; i < currWord.length; i++) {
        tmp[guessNumber][i] = currWord[i];
      }
      tmp[guessNumber][currWord.length] = letter;
      setGuessState(tmp);
    }
  };

  const onClickDown = (event) => {
    if (gameState !== GameState.InSession) return;
    if (event.key === "Enter") {
      handleEnter();
    } else if (event.key === "Backspace") {
      let tmp = [...guessState];
      for (let i = 1; i < word.length; i++) {
        if (tmp[guessNumber][i - 1] !== "" && tmp[guessNumber][i] === "") {
          tmp[guessNumber][i - 1] = "";
        }
        if (i === word.length - 1 && tmp[guessNumber][i] !== "") {
          tmp[guessNumber][i] = "";
        }
      }
      setGuessState(tmp);
    } else if ("abcdefghijklmnopqrstuvwxyz".includes(event.key.toLowerCase())) {
      handleAddLetter(
        event.key.toUpperCase(),
        getCurrentWord(guessState, guessNumber),
        word.length
      );
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onClickDown);
    return () => window.removeEventListener("keydown", onClickDown);
  });

  return (
    <div className="grid place-items-center">
      {gameState !== GameState.InSession && (
        <GameStateModal gameState={gameState} />
      )}

      <h1 className="m-2 font-bold text-2xl">Illordle</h1>
      <Board styleState={styleState} guessState={guessState} />
      <div className="sm:w-11/12 lg:w-4/12">
        <Keyboard
          onKeyPress={onKeyPress}
          theme={"hg-theme-default hg-layout-default myTheme"}
          layout={{
            default: [
              "Q W E R T Y U I O P",
              "A S D F G H J K L",
              "{Enter} Z X C V B N M {Backspace}",
            ],
          }}
          display={{
            "{Enter}": "return",
            "{Backspace}": "⌫",
          }}
          buttonTheme={[
            {
              class: "hg-correct",
              buttons: "Q W E R T Y q w e r t y",
            },
          ]}
        />
      </div>
    </div>
  );
}

export default App;
