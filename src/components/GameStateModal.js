import React from "react";
import { GameState } from "../utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createShareResultEmojis } from "../utils";
import ArticlePreview from "./ArticlePreview";

function GameStateModal({
  answer,
  author,
  storyTitle,
  storyUrl,
  gameState,
  showMessage,
  styleState,
  setModalOpen,
}) {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-white bg-opacity-90 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all max-w-sm ring-1 ring-gray-300">
            <div className="px-6 pb-4 pt-5 text-center">
              <h1
                className="font-bold text-2xl text-gray-900 mt-3 mb-6"
                id="modal-title"
              >
                {gameState === GameState.Win ? "You win!" : "You lost"}
              </h1>
              <div className="mb-6">
                <h1 className="font-bold text-md text-gray-900">Today's word: {answer}</h1>
                <p className="text-md text-gray-500">Edited by {author}</p>
              </div>
              <div className="mb-3">
                <h1 className="font-bold text-md text-gray-900 mb-1">Related story</h1>
                <ArticlePreview
                  title={storyTitle}
                  url={storyUrl}
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex flex-row-reverse ">
              <CopyToClipboard
                text={createShareResultEmojis(styleState)[0]}
                onCopy={() => showMessage("Results copied")}
              >
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-500 sm:w-auto ml-3"
                  onClick={() => setModalOpen(false)}
                >
                  Share results
                </button>
              </CopyToClipboard>

              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:w-auto"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameStateModal;
