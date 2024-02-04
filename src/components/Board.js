import React, { useCallback } from "react";
import "react-simple-keyboard/build/css/index.css";

/*
word: the correct word to current illordle board
*/
function Board({ styleState, guessState }) {
  const LetterComponent = useCallback(({ letter, style, letterNum, rowNum }) => {
    return (
      <div
        key={`(${rowNum},${letterNum})`}
        className={
          "flex-1 aspect-square m-1 text-2xl font-bold flip-card " +
          (style ? "flipped " : " ")
        }
        style={{ transitionDelay: `${250 * letterNum}ms` }}
      >
        <div
          className="flex flex-col border-2 border-neutral-200 dark:border-neutral-600 justify-center items-center card-front dark:text-white"
        >
          {letter ? letter.toUpperCase() : ""}
        </div>
        <div
          className={
            "flex flex-col justify-center items-center card-back " +
            style
          }
        >
          {letter ? letter.toUpperCase() : ""}
        </div>
      </div>
    );
  }, []);

  const RowComponent = useCallback(({ rowNum, word, rowStyle }) => {
    return (
      <div key={rowNum} className="flex flex-row w-full">
        {word.map((tile, letterNum) => (
          <LetterComponent
            rowNum={rowNum ? rowNum : 0}
            letterNum={letterNum}
            letter={tile}
            style={rowStyle[letterNum]}
          />
        ))}
      </div>
    );
  }, []);

  return (
    <div>
      <div className="mb-3 w-[80vw] max-w-sm">
        {guessState.map((guess, index) =>
          <RowComponent rowNum={index} word={guess} rowStyle={styleState[index]} />
        )}
      </div>
    </div>
  );
}

export default Board;
