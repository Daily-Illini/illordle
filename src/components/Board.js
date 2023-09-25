import React from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

// const mock = ["hello", "valid", "data"];

// Create a 2d array, which would be a word.length + 1 by word.length dimensions
const initializeBoardState = (word) => {
  var arr = new Array(word.length + 1);
  for (let i = 0; i < word.length + 1; i++) {
    arr[i] = new Array(word.length).fill("");
  }
  return arr;
};

const getCurrentWord = (guessState, guessNumber) => {
  return guessState[guessNumber].join("");
};

const hasCorrectGuess = (word, guessState, guessNumber) => {
  return getCurrentWord(guessState, guessNumber) === word.toUpperCase();
};

/*
word: the correct word to current illordle board
*/
function Board({ word, win, lose }) {
  const [guessState, setGuessState] = React.useState(
    initializeBoardState(word)
  );
  const [guessNumber, setGuessNumber] = React.useState(0);
  const [styleState, setStyleState] = React.useState(
    initializeBoardState(word)
  );
  const [gameOver, setGameOver] = React.useState(false);

  const onKeyPress = (button) => {
    let btn = button;
    if (button === "{Backspace}") btn = "Backspace";
    if (button === "{Enter}") btn = "Enter";

    const input = {
      key: btn,
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

  const validateWord = (currentWord) => {
    const hasGuessesLeft = guessNumber <= word.length;
    // const validWord = mock.includes(currWord);
    const validWordLength = currentWord.length === word.length;
    const onlyLetters = /[a-zA-Z]/.test(currentWord);

    return hasGuessesLeft && validWordLength && onlyLetters;
  };

  const onClickDown = (event) => {
    if (gameOver) return;
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

  React.useEffect(() => {
    window.addEventListener("keydown", onClickDown);
    return () => window.removeEventListener("keydown", onClickDown);
  });

  const handleEnter = () => {
    if (validateWord(getCurrentWord(guessState, guessNumber))) {
      submitWord();
      if (hasCorrectGuess(word, guessState, guessNumber)) {
        win();
        setGameOver(true);
      }
      if (
        guessNumber >= word.length &&
        !hasCorrectGuess(word, guessState, guessNumber)
      ) {
        lose();
        setGameOver(true);
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

  const LetterComponent = ({ letter, letterNum, rowNum }) => {
    return (
      <div
        key={letterNum}
        className={
          "w-16 h-16 font-bold grid place-items-center border-2 border-gray " +
          styleState[rowNum][letterNum]
        }
      >
        {letter ? letter.toUpperCase() : ""}
      </div>
    );
  };

  const RowComponent = ({ rowNum, word }) => {
    return (
      <div key={rowNum} className="flex flex-row">
        {word.map((tile, letterNum) => (
          <LetterComponent
            rowNum={rowNum ? rowNum : 0}
            letterNum={letterNum}
            letter={tile}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="border-2 border-gray">
        {guessState.map((guess, index) => (
          <RowComponent rowNum={index} word={guess} />
        ))}
      </div>
      <Keyboard
        onKeyPress={onKeyPress}
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
      />
    </div>
  );
}

export default Board;
