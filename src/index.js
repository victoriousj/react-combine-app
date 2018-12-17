import "./App.css";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import reducer from "./reducers";
import Container from "./components/Connect4/Container";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,

  document.getElementById("root")
);

serviceWorker.unregister();
