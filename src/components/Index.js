import React from 'react';

import firethief from '../assets/images/firethief.svg';

class Index extends React.Component {
  componentDidMount() {
    document.body.style.backgroundColor = 'rgb(72, 113, 133)';
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = '';
  }

  render() {
    return (
      <div>
        <img src={firethief} alt="asdf" />
      </div>
    );
  }
}

export default Index;
