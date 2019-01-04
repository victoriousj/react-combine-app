import PropTypes from 'prop-types';
import React from 'react';

import './Connect4.css';

import Column from './Column';
import Container from './Container';
import PlayClock from './PlayClock';
import MessageOverlay from './MessageOverlay';

class Connect4 extends React.Component {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    resetGame: PropTypes.func.isRequired,
    gameBoard: PropTypes.array.isRequired,
    winningPieces: PropTypes.array.isRequired,
    currentPlayer: PropTypes.number.isRequired,
  };

  componentDidMount() {
    document.body.style.backgroundColor = 'rgb(7, 152, 236)';
    this.timer = setInterval(this.props.incTimer, 1000);
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '';
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
      playerTwoTime,
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
      <div>
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
        <Container resetGame={resetGame} Columns={columns} />
      </div>
    );
  }
}

export default Connect4;
