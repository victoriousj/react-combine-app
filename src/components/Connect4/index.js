import PropTypes from 'prop-types';
import React from 'react';

import './Connect4.css';

import Column from './Column';
import Container from './Container';
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
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '';
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
        <Container resetGame={resetGame} Columns={columns} />
      </div>
    );
  }
}

export default Connect4;
