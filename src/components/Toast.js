import { useState, useEffect } from "react";

function Toast({ message }) {
  const [lastMessage, setLastMessage] = useState(message);

  useEffect(() => {
    if (message) {
      setLastMessage(message);
    }
  }, [message]);

  return (
    <div
      id="toast-default"
      className={`absolute z-20 top-11 flex items-center max-w-xs p-4 text-gray-100 dark:text-gray-900 rounded-lg shadow bg-gray-800 dark:bg-gray-200 ${message ? "" : "opacity-0 transition-opacity duration-1000 pointer-events-none"}`}
      role="alert"
    >
      <div class="text-sm font-bold">{lastMessage}</div>
    </div>
  );
}

export default Toast;
