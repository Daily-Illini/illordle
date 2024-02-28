import { useState } from "react";

export const GameState = {
  InSession: "InSession",
  Lose: "Lose",
  Win: "Win",
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
      }
    }
    copyText[i] = copyText[i].join("");
  }

  const retText =
    "The Daily Illini's Illordle \nMy results:\n" + copyText.join("\n").trim();

  return [retText, copyText.join("\n").trim()];
};

export const loadPersistentState = (uniqueKey) => {
  const state = localStorage.getItem("persistentState1.0");
  if (state) {
    const stateMap = new Map(JSON.parse(state, (key, value) => {
      if (value instanceof Object && Object.hasOwn(value, "dataType")) {
        if (value.dataType === "Map") {
          return new Map(value.value);
        } else if (value.dataType === "Set") {
          return new Set(value.value);
        }
      }

      return value;
    }));

    if (stateMap.get("uniqueKey") === uniqueKey) {
      return stateMap
    }
  }

  return new Map([["uniqueKey", uniqueKey]]);
}

export const savePersistentState = (stateMap) => {
  const state = JSON.stringify(Array.from(stateMap.entries()), (key, value) => {
    if (value instanceof Map) {
      return {
        dataType: "Map",
        value: Array.from(value.entries()),
      }
    } else if (value instanceof Set) {
      return {
        dataType: "Set",
        value: Array.from(value),
      }
    } else {
      return value;
    }
  });
  localStorage.setItem("persistentState1.0", state);
}

export const usePersistentState = (stateMap, key, initialValue) => {
  const value = stateMap.has(key)? stateMap.get(key) : initialValue;
  const [state, setState] = useState(value);

  const onChange = (newValue) => {
    stateMap.set(key, newValue);
    savePersistentState(stateMap);
    return setState(newValue);
  }

  return [state, onChange];
}
