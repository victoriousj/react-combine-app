import React from "react";

import Screen from "./Screen";

import { Provider } from "../../context";
import { AppSC } from "./StyledComponents";
import { tick, handleKeys, initialState } from "../../helpers";

// import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState();
  }

  componentDidMount() {
    this.isPlaying = setInterval(this.tick, 50);
    this.enemies = document.querySelectorAll(".Enemy");
    window.addEventListener("keydown", this.handleKeys);
  }

  componentDidUpdate(a, { isShipHit }) {
    if (isShipHit) clearInterval(this.isPlaying);
  }

  tick = () => this.setState(() => tick(this));

  handleKeys = e => this.setState(() => handleKeys(this.state, e));

  render() {
    return (
      <Provider value={this.state}>
        <AppSC>
          <Screen isShipHit={this.state.isShipHit} />
        </AppSC>
      </Provider>
    );
  }
}
