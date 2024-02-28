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
  usePersistentState,
} from "./utils";
import Toast from "./components/Toast";

function App({ wordData, dictionary, stateMap }) {
  const date = new Date(wordData["date"]).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  const word = wordData["word"].toUpperCase();
  const author = wordData["author"];
  const storyTitle = wordData["story_title"];
  const storyUrl = wordData["story_url"];

  const [guessNumber, setGuessNumber] = usePersistentState(stateMap, "guessNumber", 0);
  const [toastMessage, setToastMessage] = useState("");
  const [modalOpen, setModalOpen] = usePersistentState(stateMap, "modalOpen", false);
  const [gameState, setGameState] = usePersistentState(stateMap, "gameState", GameState.InSession);
  const [styleState, setStyleState] = usePersistentState(stateMap, "styleState", initializeBoardState(word));
  const [guessState, setGuessState] = usePersistentState(stateMap, "guessState", initializeBoardState(word));
  const [correctLetters, setCorrectLetters] = usePersistentState(stateMap, "correctLetters", new Set());
  const [existsLetters, setExistsLetters] = usePersistentState(stateMap, "existsLetters", new Set());
  const [wrongLetters, setWrongLetters] = usePersistentState(stateMap, "wrongLetters", new Set());

  useEffect(() => {
    if (gameState !== GameState.InSession) {
      setModalOpen(true);
    }
  }, [gameState]);

  const showMessage = message => {
    console.log(message);
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(""); // hide the message after 1 second
    }, 1000);
  }

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
    console.log("State");
    console.log(this);
    const currentWord = getCurrentWord(guessState, guessNumber).toUpperCase();
    const ans = [];
    const correct_letters = correctLetters;
    const exists_letters = existsLetters;
    const wrong_letters = wrongLetters;

    const letterCount = new Map();
    const correctCount = new Map();
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      const currentLetter = currentWord[i];
      letterCount.set(letter, (letterCount.get(letter) ?? 0) + 1);
      if (letter === currentLetter) {
        correctCount.set(letter, (correctCount.get(letter) ?? 0) + 1);
      }
    }

    const existsCount = new Map();
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      const currentLetter = currentWord[i];
      if (letter === currentLetter) {
        ans.push("bg-correct text-white");
        correct_letters.add(currentLetter);
        exists_letters.delete(currentLetter);
      } else if (letterCount.has(currentLetter)) {
        const remaining = letterCount.get(currentLetter) - (correctCount.get(currentLetter) ?? 0);
        if (remaining <= (existsCount.get(currentLetter) ?? 0)) {
          ans.push("bg-wrong dark:bg-wrong-dark text-white");
        } else {
          ans.push("bg-exist text-white");
          existsCount.set(currentLetter, (existsCount.get(currentLetter) ?? 0) + 1);
          if (!correctCount.has(currentLetter)) {
            exists_letters.add(currentLetter);
          }
        }
      } else {
        wrong_letters.add(currentLetter);
        ans.push("bg-wrong dark:bg-wrong-dark text-white");
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
    const currentWord = getCurrentWord(guessState, guessNumber).toUpperCase();
    if (validateWord(currentWord, guessNumber, word)) {
      if (currentWord === word || dictionary.has(currentWord)) {
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
      } else {
        showMessage("Not in word list");
      }
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
    <div className="relative">
      <GameStateModal
        answer={word}
        date={date}
        author={author}
        storyTitle={storyTitle}
        storyUrl={storyUrl}
        gameState={gameState}
        showMessage={showMessage}
        styleState={styleState}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <div className="grid place-items-center w-full relative mt-6">
        <Toast message={toastMessage}></Toast>
        <div className="w-11/12 md:w-max grid place-items-center">
          <Board styleState={styleState} guessState={guessState} />
        </div>
        <div className="w-full lg:max-w-sm">
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
    </div>
  );
}

export default App;
