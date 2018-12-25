import React from 'react';

import { SmStarSC, MdStarSC, LgStarSC } from '../components/SpaceBarrage/StyledComponents';
import { KEYS } from '../resources';

import { spaceBarrageSVGs } from '../assets';
import Enemy from '../components/SpaceBarrage/Enemy';
import { helpers } from './index';

// Space Barage
const { enemy1, enemy2, enemy3 } = spaceBarrageSVGs;
const enemiesSVGS = [enemy1, enemy2, enemy3];
const maxX = 1025;
const minX = -40;

export default () => ({
  // Runs every 50ms in order to assess and adjust state
  tick: App => {
    const enemies = App.enemies;
    let state = App.state;

    updateEnemies(enemies, state);
    state = decayVelocity(state);

    return state;
  },

  // Move the ship through keyboard input
  handleKeys: (state, e) => {
    const { rVelocity, lVelocity, shipX } = state;
    const key = e.keyCode;

    if (key === KEYS.RIGHT || key === KEYS.D) state.rVelocity = rVelocity < 20 ? rVelocity + 2 : 20;

    if (key === KEYS.LEFT || key === KEYS.A) state.lVelocity = lVelocity > -20 ? lVelocity - 2 : -20;

    state.shipX = shipX + state.lVelocity + state.rVelocity;

    if (key === KEYS.SPACE) {
      window.location.reload();
    }

    return state;
  },

  // Creates 'n' star elements with animation
  // Returns array of stars
  addStars: n => {
    const rX = () => helpers.randomUpTo(maxX);
    const rDelay = () => 0 - helpers.randomUpTo(4800);

    const stars = [];
    for (let i = 0; i < n; ++i) {
      stars.push(
        <SmStarSC key={'a' + i} x={rX()} sp={12} delay={rDelay()} />,
        <MdStarSC key={'b' + i} x={rX()} sp={8} delay={rDelay()} />,
        <LgStarSC key={'c' + i} x={rX()} sp={6} delay={rDelay()} />
      );
    }

    return stars;
  },

  // Creates 'n' amount of enemies for the game
  // Returns an array of Enemy components
  addEnemies: n => [...Array(n).keys()].map(i => <Enemy key={i} />),

  initialState: () => ({
    score: 0,
    shipX: 490,
    rVelocity: 0,
    lVelocity: 0,
    isShipHit: false,
  }),
});

// Randomly re-creates and places an enemy at the top
const resetEnemy = enemy => {
  enemy.style.webkitAnimation = 'none';
  enemy.style.animation = 'none';
  enemy.style.animationDuration = `0s`;

  // There is a slight delay so that the element has time
  // to fully reset to the CSS Styled sheets animation
  // before overriding them here
  setTimeout(function() {
    enemy.style.animation = '';
    enemy.style.webkitAnimation = '';
    enemy.style.left = `${helpers.randomUpTo(11) * 100}px`;
    enemy.style.background = `url(${enemiesSVGS[helpers.randomUpTo(3)]})`;
    enemy.style.animationDuration = `3s`;
    enemy.style.backgroundSize = 'cover';
  }, 10);
};

// Update enemies and conduct hit-detection on them and the ship
const updateEnemies = (enemies, state) => {
  const shipX = document.querySelector('.Ship').getBoundingClientRect().x;

  enemies.forEach(enemy => {
    const enemyDim = enemy.getBoundingClientRect();
    const { y, x } = enemyDim;

    if (y > 625 && y < 775) {
      if (x >= shipX - 60 && x <= shipX + 60) {
        state.isShipHit = true;
      }
    }

    if (y >= 825) {
      resetEnemy(enemy);
      state.score = state.score + 1;
    }
  });
};

// Lower the inertia of a moving ship
const decayVelocity = state => {
  const { rVelocity, lVelocity, shipX } = state;
  const velocity = lVelocity + rVelocity;

  state.lVelocity = lVelocity < 0 ? lVelocity + 1 : 0;

  state.rVelocity = rVelocity > 0 ? rVelocity - 1 : 0;

  if (velocity >= 0) {
    state.shipX = shipX <= maxX ? shipX + velocity : minX;
  } else if (velocity <= 0) {
    state.shipX = shipX >= minX ? shipX + velocity : maxX;
  }

  return state;
};
