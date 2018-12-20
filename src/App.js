import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import * as actions from "./actions";
import Connect4 from "./components/Connect4";
import SimonSays from "./components/SimonSays";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;
    this.dispatch = dispatch;

    this.incTimer = bindActionCreators(actions.incTimer, dispatch);
    this.addPiece = bindActionCreators(actions.addPiece, dispatch);
    this.resetGame = bindActionCreators(actions.resetGame, dispatch);

    this.startGame = bindActionCreators(actions.startGame, dispatch);
    this.haltInput = bindActionCreators(actions.haltInput, dispatch);
    this.allowInput = bindActionCreators(actions.allowInput, dispatch);
    this.buttonPress = bindActionCreators(actions.buttonPress, dispatch);
    this.changeTheme = bindActionCreators(actions.changeTheme, dispatch);
  }

  render() {
    const { connect4, simonSays } = this.props;
    return (
      <div className="App">
        <BrowserRouter>
          <>
            <Header />
            <Switch>
              <Route
                path={"/simonsays"}
                render={() => (
                  <SimonSays
                    {...simonSays}
                    startGame={this.startGame}
                    haltInput={this.haltInput}
                    allowInput={this.allowInput}
                    buttonPress={this.buttonPress}
                    changeTheme={this.changeTheme}
                  />
                )}
              />
              <Route
                path={"/connect4"}
                render={() => (
                  <Connect4
                    {...connect4}
                    addPiece={this.addPiece}
                    incTimer={this.incTimer}
                    resetGame={this.resetGame}
                  />
                )}
              />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { connect4, simonSays } = state;
  return {
    connect4,
    simonSays
  };
};

export default connect(mapStateToProps)(App);
