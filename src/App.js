import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Connect4 from "./components/Connect4/Connect4";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <>
            <Header />
            <Switch>
              <Route path={"/connect4"} render={() => <Connect4 />} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
