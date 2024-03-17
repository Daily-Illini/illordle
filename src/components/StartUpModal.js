import React from "react";

function StartUpModal({ modalOpen, closeModal }) {
  return (
    <div
      className={`absolute w-full h-full z-10 transition-opacity duration-1000 ${
        modalOpen ? "delay-[2000ms]" : "opacity-0 pointer-events-none"
      }`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-white dark:bg-black bg-opacity-90 dark:bg-opacity-90 transition-opacity"></div>
      <div className="absolute inset-0 z-10 w-screen overflow-y-auto p-4">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-zinc-700 shadow-xl transition-all min-w-[320px] max-w-[384px] ring-1 ring-gray-300 dark:ring-zinc-800">
            <div className="px-6 pb-4 pt-5 text-center text-gray-900 dark:text-white">
              <h1 className="font-bold text-2xl mt-3 mb-6" id="modal-title">
                Instructions
              </h1>
              <button
                onClick={closeModal}
                className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartUpModal;
