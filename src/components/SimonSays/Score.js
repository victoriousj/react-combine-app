import React from 'react';
import PropTypes from 'prop-types';

const Score = (props) => (
  <div className="game-score">
    <span className={props.isPlaying ? 'game-light-on' : 'game-light-off'}>
      {props.score}
    </span>
  </div>
);

Score.propTypes = {
  score: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default Score;
