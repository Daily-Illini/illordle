import React from "react";
import { GameState } from "../utils";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createShareResultEmojis } from "../utils";
import ArticlePreview from "./ArticlePreview";
import "bootstrap/dist/css/bootstrap.min.css";

function GameStateModal({
  answer,
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
      <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {gameState === GameState.Win ? "You Win!" : "You Lost"}
                  </h3>
                  <div className="mt-2">
                    {gameState === GameState.Lose && (
                      <h4>Today's word: {answer}</h4>
                    )}
                    <p className="text-left text-md text-gray-500">
                      Your Results:
                    </p>
                    {createShareResultEmojis(styleState)[1]
                      .split("\n")
                      .map((row) => {
                        return (
                          <p className="text-left text-md text-gray-500 mt-0 mb-0">
                            {row}
                          </p>
                        );
                      })}

                    <ArticlePreview
                      article_link="https://dailyillini.com/buzz-stories/buzz-columns/music-release-monday/2023/10/31/review-illinois-theatre-rent/"
                      picture="https://dailyillini.com/wp-content/uploads/2023/10/231025-RENT-CAP046-1200x800.jpg"
                      heading="Review | Illinois Theatre puts on spectacular, emotional performance of 'Rent'"
                      summary="“Rent,” a Broadway musical with music, lyrics and book by Jonathan Larson, ran at the Virginia Theatre from Oct. 26-28. The pro"
                      authors={["Jane Doe", "John Smith"]}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <CopyToClipboard
                text={createShareResultEmojis(styleState)[0]}
                onCopy={() => showMessage("Result copied")}
              >
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                  onClick={() => setModalOpen(false)}
                >
                  Copy Results
                </button>
              </CopyToClipboard>

              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameStateModal;
