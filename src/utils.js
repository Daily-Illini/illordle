export const GameState = {
  InSession: Symbol("InSession"),
  Lose: Symbol("Lose"),
  Win: Symbol("Win"),
};

// Create a 2d array, which would be a word.length + 1 by word.length dimensions
export const initializeBoardState = (word) => {
  var arr = new Array(word.length + 1);
  for (let i = 0; i < word.length + 1; i++) {
    arr[i] = new Array(word.length).fill("");
  }
  return arr;
};

export const getCurrentWord = (guessState, guessNumber) => {
  return guessState[guessNumber].join("");
};

export const hasCorrectGuess = (word, guessState, guessNumber) => {
  return getCurrentWord(guessState, guessNumber) === word.toUpperCase();
};

export const validateWord = (currentWord, guessNumber, word) => {
  const hasGuessesLeft = guessNumber <= word.length;
  // const validWord = mock.includes(currWord);
  const validWordLength = currentWord.length === word.length;
  const onlyLetters = /[a-zA-Z]/.test(currentWord);

  return hasGuessesLeft && validWordLength && onlyLetters;
};

export const createShareResultEmojis = (styleState) => {
  let copyText = initializeBoardState(
    Array(styleState[0].length).fill("t").join("")
  );
  for (let i = 0; i < copyText.length; i++) {
    for (let j = 0; j < copyText[i].length; j++) {
      if (styleState[i][j].includes("correct")) {
        copyText[i][j] = "🟩";
      } else if (styleState[i][j].includes("exist")) {
        copyText[i][j] = "🟨";
      } else if (styleState[i][j].includes("wrong")) {
        copyText[i][j] = "⬛";
      } else if (styleState[i][j].includes("consecutive")) {
        copyText[i][j] = "🟪"
      }
    }
    copyText[i] = copyText[i].join("");
  }

  const retText =
    "The Daily Illini's Illordle \nMy results:\n" + copyText.join("\n").trim();

  return [retText, copyText.join("\n").trim()];
};

// gets word and article
export const getData = () => {};
