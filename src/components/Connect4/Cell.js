import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import React from 'react';

const Cell = props => {
  const { cellValue, winningPiece, isFirstFreeCell, currentPlayer } = props;

  const cellStyle = `
    cell 
    ${isFirstFreeCell ? 'glow' : ''} 
    ${currentPlayer === 1 ? `red` : `black`}
  `;

  const playerPieceStyle = `
    player-piece 
    peice-overlay 
    ${cellValue === 1 ? `red` : `black`} 
    ${winningPiece ? 'winning-piece' : ''}
  `;

  const playerPiece =
    cellValue !== 0 ? <div className={playerPieceStyle} /> : null;

  return (
    <div className="cell-parent">
      <div className={cellStyle} />
      <ReactCSSTransitionGroup
        transitionName="slide"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {playerPiece}
      </ReactCSSTransitionGroup>
    </div>
  );
};

Cell.propTypes = {
  cellValue: PropTypes.number.isRequired,
  winningPiece: PropTypes.bool.isRequired,
  currentPlayer: PropTypes.number.isRequired,
  isFirstFreeCell: PropTypes.bool.isRequired
};

export default Cell;
