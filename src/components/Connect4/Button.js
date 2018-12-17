import React, { Component } from "react";
import PropTypes from "prop-types";

import { sounds } from "../../assets/";

export default class Button extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    inputPause: PropTypes.bool.isRequired,
    buttonPress: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { show: false };
  }

  registerButtonPress = () => {
    const { props } = this;
    if (!props.inputPause && props.isPlaying) {
      this.buttonPress();
      props.buttonPress(props.index);
    }
  };

  buttonPress = () => {
    this.setState({ show: true });

    const soundEffect = new Audio();
    soundEffect.src = sounds[this.props.index];
    soundEffect.currentTime = 0.125;
    soundEffect.play();

    setTimeout(() => this.setState({ show: false }), 150);
  };

  render() {
    const { props, state } = this;
    const { color, inputPause } = props;
    const { show } = state;

    const buttonStyle = `button ${show && !inputPause ? "shrink" : ""}`;
    const overlayStyle = `overlay ${show ? "on" : ""}`;

    return (
      <div
        className={buttonStyle}
        onClick={this.registerButtonPress}
        style={{ backgroundColor: color }}
      >
        <div className={overlayStyle} />
      </div>
    );
  }
}
