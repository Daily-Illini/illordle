import { useState, useEffect } from "react";
import "./Toast.css";

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
      className={`absolute top-11 flex items-center max-w-xs p-4 text-gray-100 rounded-lg shadow bg-gray-800 ${message ? "" : "toast-hidden"}`}
      role="alert"
    >
      <div class="text-sm font-bold">{lastMessage}</div>
    </div>
  );
}

export default Toast;
