import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import React from 'react';

const MessageOverlay = props => {
  const { winningPlayer, resetGame } = props;

  const overlay = (
    <div className="message-container">
      <div className="message-top-half">
        <h2>{`Player ${winningPlayer} Wins!`}</h2>
      </div>
      <div className="message-bottom-half">
        <button className="message-button" onClick={() => resetGame()}>
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <div className={`message-overlay`}>
      <ReactCSSTransitionGroup
        transitionName="side-slide"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={200}
      >
        {overlay}
      </ReactCSSTransitionGroup>
    </div>
  );
};

MessageOverlay.propTypes = {
  winningPlayer: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired
};

export default MessageOverlay;
