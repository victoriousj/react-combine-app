import { bindActionCreators } from "redux";
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./SimonSays.css";

import Button from "./Button";
import Controls from "./Controls";
import { delay } from "../../helpers";
import * as actionCreators from "../../actions";

class Container extends Component {
  static propTypes = {
    score: PropTypes.string.isRequired,
    hScore: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    inputPause: PropTypes.bool.isRequired,
    colorScheme: PropTypes.number.isRequired,
    buttonColors: PropTypes.array.isRequired,
    playbackSequence: PropTypes.array.isRequired,
    playerPlaybackSequence: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.endGame = bindActionCreators(actionCreators.endGame, dispatch);
    this.startGame = bindActionCreators(actionCreators.startGame, dispatch);
    this.haltInput = bindActionCreators(actionCreators.haltInput, dispatch);
    this.allowInput = bindActionCreators(actionCreators.allowInput, dispatch);
    this.buttonPress = bindActionCreators(actionCreators.buttonPress, dispatch);
    this.changeColorScheme = bindActionCreators(
      actionCreators.changeColorScheme,
      dispatch
    );
    this.addToPlaybackSequence = bindActionCreators(
      actionCreators.addToPlaybackSequence,
      dispatch
    );
  }

  componentDidUpdate(prevState) {
    if (
      this.props.playbackSequence.length !== prevState.playbackSequence.length
    ) {
      setTimeout(() => {
        this.showPlaybackSequence();
      }, 1000);
    }
  }

  showPlaybackSequence = () => {
    const { props } = this;
    (async () => {
      this.haltInput();

      for (let i = 0; i < props.playbackSequence.length; await delay(500)) {
        let currentButton = this.refs[props.playbackSequence[i++]];
        currentButton.buttonPress();
      }

      await this.allowInput();
    })();
  };

  render() {
    const { props } = this;
    const { colorScheme, isPlaying, inputPause, buttonColors, score } = props;

    const buttonComponents = buttonColors[colorScheme].map(
      (buttonColor, index) => (
        <Button
          key={index}
          ref={index}
          index={index}
          color={buttonColor}
          isPlaying={isPlaying}
          inputPause={inputPause}
          buttonPress={this.buttonPress}
        />
      )
    );

    return (
      <div className="App">
        <div className="container">
          {buttonComponents}
          <Controls
            score={score}
            isPlaying={isPlaying}
            startGame={this.startGame}
            changeColorScheme={this.changeColorScheme}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  score: state.score,
  hScore: state.hScore,
  isPlaying: state.isPlaying,
  inputPause: state.inputPause,
  colorScheme: state.colorScheme,
  buttonColors: state.buttonColors,
  currentButton: state.currentButton,
  playbackSequence: state.playbackSequence,
  playerPlaybackSequence: state.playerPlaybackSequence
});

export default connect(mapStateToProps)(Container);
