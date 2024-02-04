import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const [wordData, dictionary] = await Promise.all([
  fetch("https://app.dailyillini.com/illordle/word/today").then(response => response.json()),
  fetch("./words.txt").then(response => response.text()).then(data => new Set(data.split("\n"))),
]);

if (window.innerWidth < 550) { // mobile device
  document.documentElement.classList.add("dark");
}

root.render(
  <React.StrictMode>
    <App wordData={wordData} dictionary={dictionary} />
  </React.StrictMode>
);
