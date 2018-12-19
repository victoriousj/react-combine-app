import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

import "./Connect4.css";

import Column from "./Column";
import Container from "./Container";
import PlayClock from "./PlayClock";
import MessageOverlay from "./MessageOverlay";

import * as actionCreators from "../../actions";

class App extends React.Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    gameBoard: PropTypes.array.isRequired,
    winningPieces: PropTypes.array.isRequired,
    currentPlayer: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    const { dispatch } = props;
    this.dispatch = dispatch;

    this.incTimer = bindActionCreators(actionCreators.incTimer, dispatch);
    this.addPiece = bindActionCreators(actionCreators.addPiece, dispatch);
    this.resetGame = bindActionCreators(actionCreators.resetGame, dispatch);
  }

  componentDidMount() {
    setInterval(this.incTimer, 1000);
  }

  render() {
    console.log(this);
    const { props } = this;
    const {
      isPlaying,
      currentPlayer,
      winningPieces,
      showOverlay,
      playerOneTime,
      playerTwoTime
    } = props;

    const columns = props.gameBoard.map((columnValues, index) => (
      <Column
        key={index}
        columnIndex={index}
        isPlaying={isPlaying}
        addPiece={this.addPiece}
        columnValues={columnValues}
        currentPlayer={currentPlayer}
        winningPieces={winningPieces}
      />
    ));

    return (
      <div className="App">
        {showOverlay && (
          <MessageOverlay
            showOverlay={showOverlay}
            resetGame={this.resetGame}
            winningPlayer={currentPlayer}
          />
        )}
        <div className="playclocks">
          <PlayClock player={1} time={playerOneTime} />
          <PlayClock player={2} time={playerTwoTime} />
        </div>
        <Container Columns={columns} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameBoard: state.gameBoard,
  isPlaying: state.isPlaying,
  showOverlay: state.showOverlay,
  currentPlayer: state.currentPlayer,
  winningPieces: state.winningPieces,
  playerOneTime: state.playerOneTime,
  playerTwoTime: state.playerTwoTime
});

export default connect(mapStateToProps)(App);
