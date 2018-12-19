import PropTypes from "prop-types";
import React from "react";

import Score from "./Score";
import ControlButtons from "./ControlButtons";

const Controls = props => (
  <div className="controls">
    <div className="game-name">
      <span className="name">simon</span>
      <span className="game-name-buffer" />
    </div>

    <div className="game-controls">
      <Score score={props.score} isPlaying={props.isPlaying} />
      <ControlButtons
        isPlaying={props.isPlaying}
        startGame={props.startGame}
        changeColorScheme={props.changeColorScheme}
      />
    </div>
  </div>
);

Controls.protoTypes = {
  score: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired,
  changeColorScheme: PropTypes.number.isRequired
};

export default Controls;
