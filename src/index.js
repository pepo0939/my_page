import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./components/mainPage/mainPage";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./redux/reducers";

import "./styles.css";

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
