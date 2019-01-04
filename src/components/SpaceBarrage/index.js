import React from 'react';

import Screen from './Screen';

import { Provider } from '../../context';
import { AppSC } from './StyledComponents';
import { spaceBarrageHelpers } from '../../helpers';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = spaceBarrageHelpers.initialState();
  }

  componentDidMount() {
    this.isPlaying = setInterval(this.tick, 50);
    this.enemies = document.querySelectorAll('.Enemy');
    window.addEventListener('keydown', this.handleKeys);
  }

  componentDidUpdate(a, { isShipHit }) {
    if (isShipHit) clearInterval(this.isPlaying);
  }

  tick = () => this.setState(() => spaceBarrageHelpers.tick(this));

  handleKeys = e =>
    this.setState(() => spaceBarrageHelpers.handleKeys(this.state, e));

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
