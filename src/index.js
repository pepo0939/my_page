import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./components/mainPage/mainPage";

import "./styles.css";

function App() {
  return <MainPage />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
