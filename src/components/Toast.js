import React from "react";

function Toast({ setOpen }) {
  return (
    <div
      id="toast-default"
      className="flex items-center w-full max-w-xs p-4 text-gray-900 rounded-lg shadow bg-green-100"
      role="alert"
    >
      <div class="ml-3 text-sm font-bold">Result copied</div>
      <button
        type="button"
        class="ml-auto -mx-1.5 -my-1.5 text-gray-900 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 hover:text-gray-400"
        data-dismiss-target="#toast-default"
        aria-label="Close"
        onClick={() => setOpen(false)}
      >
        <span class="sr-only">Close</span>
        <svg
          class="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}

export default Toast;
