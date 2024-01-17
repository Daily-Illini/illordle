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
import Toast from "./components/Toast";
import "bootstrap/dist/css/bootstrap.min.css";

function App({ apiResponse }) {
  const date = new Date(apiResponse["date"]).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  const word = apiResponse["word"];

  const [guessNumber, setGuessNumber] = useState(0);
  const [copy, setCopy] = useState(false); //holds state on whether or not the results have bene copied
  const [modalOpen, setModalOpen] = useState(false);
  const [gameState, setGameState] = useState(GameState.InSession);
  const [styleState, setStyleState] = useState(initializeBoardState(word));
  const [guessState, setGuessState] = useState(initializeBoardState(word));
  const [correctLetters, setCorrectLetters] = useState(new Set());
  const [existsLetters, setExistsLetters] = useState(new Set());
  const [wrongLetters, setWrongLetters] = useState(new Set());

  useEffect(() => {
    if (gameState !== GameState.InSession) {
      setModalOpen(true);
    }
  }, [gameState]);

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
    const correct_letters = correctLetters;
    const exists_letters = existsLetters;
    const wrong_letters = wrongLetters;

    for (let i = 0; i < word.length; i++) {
      if (word[i].toUpperCase() === currentWord[i].toUpperCase()) {
        ans.push("bg-correct text-white");
        correct_letters.add(currentWord[i].toUpperCase());
        exists_letters.delete(currentWord[i].toUpperCase());
      } else if (
        word.toUpperCase().split("").includes(currentWord[i].toUpperCase())
      ) {
        ans.push("bg-exist text-white");
        exists_letters.add(currentWord[i].toUpperCase());
      } else {
        wrong_letters.add(currentWord[i].toUpperCase());
        ans.push("bg-wrong bg-gray-600");
      }
    }

    const tmp = [...styleState];
    tmp[guessNumber] = ans;

    setStyleState(tmp);
    setCorrectLetters(correct_letters);
    setExistsLetters(exists_letters);
    setWrongLetters(wrong_letters);
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
    <div>
      {modalOpen ? (
        <GameStateModal
          answer={word}
          gameState={gameState}
          setCopy={setCopy}
          styleState={styleState}
          setModalOpen={setModalOpen}
        />
      ) : (
        <div className="grid place-items-center w-full">
          {copy && <Toast setOpen={setCopy} />}
          <div>
            <h1 className="mb-4 m-2 font-bold text-3xl">{date}</h1>
          </div>
          <div className="w-11/12 md:w-max grid place-items-center">
            <Board styleState={styleState} guessState={guessState} />
          </div>
          <div className="w-full lg:w-4/12">
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
                  class: "hg-wrong",
                  buttons: Array.from(wrongLetters).join(" "),
                },
                {
                  class: "hg-exists",
                  buttons: Array.from(existsLetters).join(" "),
                },
                {
                  class: "hg-correct",
                  buttons: Array.from(correctLetters).join(" "),
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
