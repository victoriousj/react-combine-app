import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Connect4 from "./components/Connect4";
import SimonSays from "./components/SimonSays";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <>
            <Header />
            <Switch>
              <Route path={"/simonsays"} render={() => <SimonSays />} />
              <Route path={"/connect4"} render={() => <Connect4 />} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
