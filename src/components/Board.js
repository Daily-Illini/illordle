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

// const getPreviousGuesses = (guessState) => {
//   console.log(guessState.map((row) => row.join("")));
//   return guessState.map((row) => row.join(""));
// };

const getCurrentWord = (guessState, guessNumber) => {
  console.log(guessState[guessNumber].join(""));
  return guessState[guessNumber].join("");
};

/*
word: the correct word to current illordle board
*/
function Board({ word }) {
  const [guessState, setGuessState] = React.useState(
    initializeBoardState(word)
  );
  const [guessNumber, setGuessNumber] = React.useState(0);
  const [styleState, setStyleState] = React.useState(
    initializeBoardState(word)
  );

  // const onChange = (input) => {
  //   console.log("Input changed", input);
  // };

  const onKeyPress = (button) => {
    let btn = button;
    if (button === "{Backspace}") btn = "Backspace";
    if (button === "{Enter}") btn = "Enter";

    const input = {
      key: btn,
    };
    onClickDown(input);
    console.log("Button pressed", btn);
  };

  const submitWord = () => {
    const currentWord = getCurrentWord(guessState, guessNumber);
    const ans = [];
    const seen = new Set();

    for (let i = 0; i < word.length; i++) {
      if (word[i] === currentWord[i]) ans.push("bg-correct text-white");
      else if (seen.has(currentWord[i])) ans.push("bg-exist text-white");
      else ans.push("bg-wrong bg-gray-600");

      seen.add(word[i]);
    }

    const tmp = [...styleState];
    tmp[guessNumber] = ans;

    console.log(tmp);

    setStyleState(tmp);
  };

  const validateWord = (currentWord) => {
    const hasGuessesLeft = guessNumber < word.length;
    // const validWord = mock.includes(currWord);
    const validWordLength = currentWord.length === word.length;
    const onlyLetters = /[a-zA-Z]/.test(currentWord);

    return hasGuessesLeft && validWordLength && onlyLetters;
  };

  const onClickDown = (event) => {
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
        event.key,
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
      setGuessNumber(guessNumber + 1);
      // console.log("valid");
    } else {
      // console.log("invalid");
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
      // console.log(tmp);
    }
  };

  const LetterComponent = ({ letter, letterNum, rowNum }) => {
    return (
      <div
        key={letterNum}
        className={
          "w-16 h-16 font-bold grid place-items-center border-2 border-gray " //+
          // styleState[rowNum][letterNum]
        }
      >
        {letter ? letter.toUpperCase() : ""}
      </div>
    );
  };

  const RowComponent = ({ key, word }) => {
    return (
      <div key={key} className="flex flex-row">
        {word.map((tile, letterNum) => (
          <LetterComponent
            rowNum={key ? key : 0}
            letterNum={letterNum}
            letter={tile}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="border-2 border-gray-300">
      {guessState.map((guess, index) => (
        <RowComponent key={index} word={guess} />
      ))}
      <Keyboard
        onKeyPress={onKeyPress}
        layout={{
          default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "{shift} z x c v b n m {Backspace}",
            "{numbers} {space} {Enter}",
          ],
          shift: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "{shift} Z X C V B N M {Backspace}",
            "{numbers} {space} {Enter}",
          ],
          numbers: ["1 2 3", "4 5 6", "7 8 9", "{abc} 0 {Backspace}"],
        }}
        display={{
          "{numbers}": "123",
          "{Enter}": "return",
          "{escape}": "esc ⎋",
          "{tab}": "tab ⇥",
          "{Backspace}": "⌫",
          "{capslock}": "caps lock ⇪",
          "{shift}": "⇧",
          "{controlleft}": "ctrl ⌃",
          "{controlright}": "ctrl ⌃",
          "{altleft}": "alt ⌥",
          "{altright}": "alt ⌥",
          "{metaleft}": "cmd ⌘",
          "{metaright}": "cmd ⌘",
          "{abc}": "ABC",
          "{space}": " ",
        }}
      />
    </div>
  );
}

export default Board;
