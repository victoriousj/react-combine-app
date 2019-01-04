import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SimonSays.css';

import Button from './Button';
import Controls from './Controls';
import { simonSaysHelpers } from '../../helpers';

class Container extends Component {
  static propTypes = {
    score: PropTypes.string.isRequired,
    hScore: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    inputPause: PropTypes.bool.isRequired,
    colorScheme: PropTypes.number.isRequired,
    buttonColors: PropTypes.array.isRequired,
    playbackSequence: PropTypes.array.isRequired,
    playerPlaybackSequence: PropTypes.array.isRequired,
  };

  componentDidMount() {
    document.body.style.backgroundColor = 'rgb(255, 95, 69)';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '';
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
      props.haltInput();

      for (
        let i = 0;
        i < props.playbackSequence.length;
        await simonSaysHelpers.delay(500)
      ) {
        let currentButton = this.refs[props.playbackSequence[i++]];
        currentButton.buttonPress();
      }

      await props.allowInput();
    })();
  };

  render() {
    const { props } = this;
    const {
      score,
      isPlaying,
      startGame,
      inputPause,
      changeTheme,
      colorScheme,
      buttonPress,
      buttonColors,
    } = props;

    const buttonComponents = buttonColors[colorScheme].map(
      (buttonColor, index) => (
        <Button
          key={index}
          ref={index}
          index={index}
          color={buttonColor}
          isPlaying={isPlaying}
          inputPause={inputPause}
          buttonPress={buttonPress}
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
            startGame={startGame}
            changeTheme={changeTheme}
          />
        </div>
      </div>
    );
  }
}

export default Container;
