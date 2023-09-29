import React from "react";
import { GameState } from "../utils";

function GameStateModal({ gameState }) {
  return (
    <div className="border-2">
      <h1>{gameState === GameState.Win ? "You win!" : "You lost :("}</h1>
    </div>
  );
}

export default GameStateModal;
