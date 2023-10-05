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
