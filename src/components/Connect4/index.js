import PropTypes from "prop-types";
import React from "react";

import "./Connect4.css";

import Column from "./Column";
import Container from "./Container";
import PlayClock from "./PlayClock";
import MessageOverlay from "./MessageOverlay";

class Connect4 extends React.Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    gameBoard: PropTypes.array.isRequired,
    winningPieces: PropTypes.array.isRequired,
    currentPlayer: PropTypes.number.isRequired
  };

  componentDidMount() {
    setInterval(this.props.incTimer, 1000);
  }

  render() {
    const { props } = this;
    const {
      addPiece,
      isPlaying,
      resetGame,
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
        addPiece={addPiece}
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
            resetGame={resetGame}
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

export default Connect4;
