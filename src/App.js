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
  const word = "daily";
  const [guessNumber, setGuessNumber] = useState(0);
  const [copy, setCopy] = useState(false); //holds state on whether or not the results have bene copied
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

    for (let i = 0; i < word.length; i++) {
      if (word[i].toUpperCase() === currentWord[i].toUpperCase())
        ans.push("bg-correct text-white");
      else if (
        word.toUpperCase().split("").includes(currentWord[i].toUpperCase())
      )
        ans.push("bg-exist text-white");
      else ans.push("bg-wrong bg-gray-600");
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
        <GameStateModal gameState={gameState} setCopy={setCopy} />
      )}

      {copy && (
        <div
          class="pointer-events-auto mx-auto mb-4 hidden w-96 max-w-full rounded-lg bg-primary-100 bg-clip-padding text-sm text-primary-700 shadow-lg shadow-black/5 data-[te-toast-show]:block data-[te-toast-hide]:hidden"
          id="static-example"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-te-autohide="true"
          data-te-toast-init
          data-te-toast-show
        >
          <div class="flex items-center justify-between rounded-t-lg border-b-2 border-primary-200 bg-primary-100 bg-clip-padding px-4 pb-2 pt-2.5 text-primary-700">
            <p class="flex items-center font-bold text-primary-700">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="info-circle"
                class="mr-2 h-4 w-4 fill-current"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
                ></path>
              </svg>
              MDBootstrap
            </p>
            <div class="flex items-center">
              <p class="text-xs text-primary-700">11 mins ago</p>
              <button
                type="button"
                class="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-toast-dismiss
                aria-label="Close"
              >
                <span class="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          <div class="break-words rounded-b-lg bg-primary-100 px-4 py-4 text-primary-700">
            Hello, world! This is a toast message.
          </div>
        </div>
      )}

      <h1 className="m-2 font-bold text-2xl">Illordle</h1>
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
