import React from "react";

function GameStateModal({ didWin }) {
  return (
    <div className="border-2">
      <h1>{didWin ? "You win!" : "You lost :("}</h1>
    </div>
  );
}

export default GameStateModal;
