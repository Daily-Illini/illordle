import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const response = await fetch("https://app.dailyillini.com/illordle/word/today");
const responseData = await response.json();

root.render(
  <React.StrictMode>
    <App apiResponse={responseData} />
  </React.StrictMode>
);
