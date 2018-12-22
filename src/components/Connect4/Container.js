import PropTypes from "prop-types";
import React from "react";

const Container = props => (
  <div className="connect-container">
    <div className="container-top" />
    <div className="container-body">{props.Columns}</div>
    <div className="container-bottom">
      <span onClick={() => props.resetGame()}>Connect4</span>
    </div>
  </div>
);

Container.propTypes = {
  Columns: PropTypes.array.isRequired,
  resetGame: PropTypes.func.isRequired
};

export default Container;
