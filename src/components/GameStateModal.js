import React from "react";
import { GameState } from "../utils";
import { CopyToClipboard } from "react-copy-to-clipboard";

function GameStateModal({ gameState, setCopy }) {
  return (
    <div
      class="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    {gameState === GameState.Win ? "You Win!" : "You Lost"}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nunc convallis, nulla at interdum ultrices, est eros
                      posuere magna, id malesuada nibh velit quis tortor. Sed
                      cursus nisi quis ante auctor, id tincidunt mi tincidunt.
                      Nam ut vehicula tellus. Etiam nec massa at eros facilisis
                      mollis. Praesent vitae
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <CopyToClipboard
                text={"this is a copied value"}
                onCopy={() => setCopy(true)}
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                >
                  Copy Results
                </button>
              </CopyToClipboard>

              <button
                type="button"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
