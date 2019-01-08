import React from 'react';

import GameCard from './GameCard';

class Index extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = 'rgb(72, 113, 133)';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '';
  }

  render() {
    return <GameCard />;
  }
}

export default Index;
