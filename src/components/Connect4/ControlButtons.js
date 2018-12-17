import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, transit } from "react-css-transition";

CSSTransition.childContextTypes = {};
const transitionStyles = {
  enterStyle: { transform: transit("translate(52.5%)", 100, "ease-in-out") },
  leaveStyle: { transform: transit("translate(0)", 100, "ease-in-out") },
  activeStyle: { transform: "translate(52.5%)" }
};

const ControlButtons = props => (
  <div className="control-buttons">
    <div className={`game-light ${props.isPlaying ? "game-light-on" : ""}`} />
    <div onClick={() => props.startGame()} className="game-switch">
      <CSSTransition {...transitionStyles} active={props.isPlaying}>
        <div className="game-switch-toggle" />
      </CSSTransition>
    </div>
    <div
      onClick={() => props.changeColorScheme()}
      className={`game-reset ${!props.isPlaying ? "game-light-off" : ""}`}
    />
  </div>
);

ControlButtons.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  startGame: PropTypes.func.isRequired,
  changeColorScheme: PropTypes.func.isRequired
};

export default ControlButtons;
