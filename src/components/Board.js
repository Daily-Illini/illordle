import React from "react";
import "react-simple-keyboard/build/css/index.css";
import { motion } from "framer-motion";

/*
word: the correct word to current illordle board
*/
function Board({ styleState, guessState, rowIndexAnimation }) {
  const LetterComponent = ({ letter, letterNum, rowNum }) => {
    return (
      <div
        key={letterNum}
        className={
          "w-16 h-16 font-bold grid place-items-center border-2 border-gray m-0.5 " +
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
      <div className="mb-3">
        {guessState.map((guess, index) =>
          index === rowIndexAnimation ? (
            <motion.div>
              <RowComponent rowNum={index} word={guess} />
            </motion.div>
          ) : (
            <RowComponent rowNum={index} word={guess} />
          )
        )}
      </div>
    </div>
  );
}

export default Board;
