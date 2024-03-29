import React from "react";
import { GameState } from "../utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createShareResultEmojis } from "../utils";
import ArticlePreview from "./ArticlePreview";

function GameStateModal({
  answer,
  date,
  author,
  storyTitle,
  storyUrl,
  gameState,
  showMessage,
  styleState,
  modalOpen,
  setModalOpen,
}) {
  const shareResult = async () => {
    const toShare = createShareResultEmojis(styleState)[0];
    if (window.innerWidth < 550) { // mobile device
      try {
        await navigator.share({ text: toShare });
      } catch {}
    } else {
      navigator.clipboard.writeText(toShare);
      showMessage("Results copied");
    }
  }

  return (
    <div
      className={`absolute w-full h-full z-10 transition-opacity duration-1000 ${modalOpen ? "delay-[2000ms]" : "opacity-0 pointer-events-none"}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 transition-opacity"></div>
      <div className="absolute inset-0 z-10 w-screen overflow-y-auto p-4">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-zinc-700 shadow-xl transition-all min-w-[320px] max-w-[384px] ring-1 ring-gray-300 dark:ring-zinc-800">
            <div className="px-6 pb-4 pt-5 text-center text-gray-900 dark:text-white">
              <h1
                className="font-bold text-2xl mt-3 mb-6"
                id="modal-title"
              >
                {gameState === GameState.Win ? "You win!" : "You lost"}
              </h1>
              <div className="mb-6">
                <h1 className="font-bold text-md">Today's word: {answer}</h1>
                <p className="text-md text-gray-500 dark:text-zinc-300">{date}</p>
                {author && <p className="text-md text-gray-500 dark:text-zinc-300">Edited by {author}</p>}
              </div>
              {
                storyTitle ?
                <div className="mb-3">
                  <h1 className="font-bold text-md mb-1">Related to this word</h1>
                  <ArticlePreview
                    title={storyTitle}
                    url={storyUrl}
                  />
                </div>
                :
                <div className="mb-3">
                  <h1 className="font-bold text-md mb-1">Catch up on local news</h1>
                  <a
                    href="https://dailyillini.com"
                    target="_top"
                    className="underline"
                  >
                    Go to The Daily Illini
                  </a>
                </div>
              }
            </div>
            <div className="bg-gray-50 dark:bg-zinc-800 px-4 py-3 flex flex-row-reverse ">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:w-auto ml-3"
                onClick={shareResult}
              >
                Share results
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameStateModal;
