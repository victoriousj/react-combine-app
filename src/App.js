import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import SimonSays from "./components/SimonSays/SimonSays";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <>
            <Header />
            <Switch>
              <Route path={"/simonsays"} render={() => <SimonSays />} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
