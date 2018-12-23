import React from "react";

import simonSays from "./simonSaysHelpers";

import {
  SmStarSC,
  MdStarSC,
  LgStarSC
} from "../components/SpaceBarrage/StyledComponents";
import { KEYS } from "../resources";

import { spaceBarrageSVGs } from "../assets";
import Enemy from "../components/SpaceBarrage/Enemy";

export const simonSaysHelpers = simonSays();

// Connect4
export const checkGameBoard = gameBoard => {
  let winningPeices = [];
  // vertical
  for (let columnIndex = 0; columnIndex <= 6; columnIndex++) {
    const column = gameBoard[columnIndex];

    for (let cellIndex = 0; cellIndex <= 2; cellIndex++) {
      if (column[cellIndex] === 0) continue;

      const verticalGroup = [
        column[cellIndex],
        column[cellIndex + 1],
        column[cellIndex + 2],
        column[cellIndex + 3]
      ];

      if (areIdentical(verticalGroup)) {
        winningPeices = [
          { column: columnIndex, row: cellIndex + 0 },
          { column: columnIndex, row: cellIndex + 1 },
          { column: columnIndex, row: cellIndex + 2 },
          { column: columnIndex, row: cellIndex + 3 }
        ];
      }
    }
  }

  // horizontal
  for (let rowIndex = 5; rowIndex >= 0; rowIndex--) {
    const rows = gameBoard.map((column, i) => [column[rowIndex], i]);

    for (let cellIndex = 0; cellIndex <= 3; cellIndex++) {
      if (rows[cellIndex][0] === 0) continue;

      const horizontalGroup = [
        rows[cellIndex + 0][0],
        rows[cellIndex + 1][0],
        rows[cellIndex + 2][0],
        rows[cellIndex + 3][0]
      ];

      if (areIdentical(horizontalGroup)) {
        winningPeices = [
          ...winningPeices,
          { column: rows[cellIndex + 0][1], row: rowIndex },
          { column: rows[cellIndex + 1][1], row: rowIndex },
          { column: rows[cellIndex + 2][1], row: rowIndex },
          { column: rows[cellIndex + 3][1], row: rowIndex }
        ];
      }
    }
  }

  // diagonal, up-to-the-right
  for (let diagonalYIndex = 0; diagonalYIndex <= 3; diagonalYIndex++) {
    for (
      let diagonalGroupXIndex = 0;
      diagonalGroupXIndex <= 2;
      diagonalGroupXIndex++
    ) {
      if (gameBoard[diagonalYIndex][diagonalGroupXIndex] === 0) continue;

      const diagonalGroup = [
        gameBoard[diagonalYIndex + 0][diagonalGroupXIndex + 0],
        gameBoard[diagonalYIndex + 1][diagonalGroupXIndex + 1],
        gameBoard[diagonalYIndex + 2][diagonalGroupXIndex + 2],
        gameBoard[diagonalYIndex + 3][diagonalGroupXIndex + 3]
      ];

      if (areIdentical(diagonalGroup)) {
        winningPeices = [
          ...winningPeices,
          { column: diagonalYIndex + 0, row: diagonalGroupXIndex + 0 },
          { column: diagonalYIndex + 1, row: diagonalGroupXIndex + 1 },
          { column: diagonalYIndex + 2, row: diagonalGroupXIndex + 2 },
          { column: diagonalYIndex + 3, row: diagonalGroupXIndex + 3 }
        ];
      }
    }
  }

  // diagonal down-to-the-right
  for (let diagonalYIndex = 0; diagonalYIndex <= 3; diagonalYIndex++) {
    for (
      let diagonalGroupXIndex = 6;
      diagonalGroupXIndex >= 0;
      diagonalGroupXIndex--
    ) {
      if (gameBoard[diagonalYIndex][diagonalGroupXIndex] === 0) continue;

      const diagonalGroup = [
        gameBoard[diagonalYIndex + 0][diagonalGroupXIndex - 0],
        gameBoard[diagonalYIndex + 1][diagonalGroupXIndex - 1],
        gameBoard[diagonalYIndex + 2][diagonalGroupXIndex - 2],
        gameBoard[diagonalYIndex + 3][diagonalGroupXIndex - 3]
      ];

      if (areIdentical(diagonalGroup)) {
        winningPeices = [
          ...winningPeices,
          { column: diagonalYIndex + 0, row: diagonalGroupXIndex - 0 },
          { column: diagonalYIndex + 1, row: diagonalGroupXIndex - 1 },
          { column: diagonalYIndex + 2, row: diagonalGroupXIndex - 2 },
          { column: diagonalYIndex + 3, row: diagonalGroupXIndex - 3 }
        ];
      }
    }
    if (winningPeices.length > 0) return winningPeices;
  }
};

const areIdentical = arr => arr.every(v => v === arr[0]);

// Space Barage
const { enemy1, enemy2, enemy3 } = spaceBarrageSVGs;
const enemiesSVGS = [enemy1, enemy2, enemy3];
const maxX = 1025;
const minX = -40;

//////////////////////
// Helper Functions //
//////////////////////

// Runs every 50ms in order to assess and adjust state
export const tick = App => {
  const enemies = App.enemies;
  let state = App.state;

  updateEnemies(enemies, state);
  state = decayVelocity(state);

  return state;
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

// Update enemies and conduct hit-detection on them and the ship
const updateEnemies = (enemies, state) => {
  const shipX = document.querySelector(".Ship").getBoundingClientRect().x;

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

// Randomly re-creates and places an enemy at the top
const resetEnemy = enemy => {
  enemy.style.webkitAnimation = "none";
  enemy.style.animation = "none";
  enemy.style.animationDuration = `0s`;

  // There is a slight delay so that the element has time
  // to fully reset to the CSS Styled sheets animation
  // before overriding them here
  setTimeout(function() {
    enemy.style.animation = "";
    enemy.style.webkitAnimation = "";
    enemy.style.left = `${randomUpTo(11) * 100}px`;
    enemy.style.background = `url(${enemiesSVGS[randomUpTo(3)]})`;
    enemy.style.animationDuration = `3s`;
    enemy.style.backgroundSize = "cover";
  }, 10);
};

// Move the ship through keyboard input
export const handleKeys = (state, e) => {
  const { rVelocity, lVelocity, shipX } = state;
  const key = e.keyCode;

  if (key === KEYS.RIGHT || key === KEYS.D)
    state.rVelocity = rVelocity < 20 ? rVelocity + 2 : 20;

  if (key === KEYS.LEFT || key === KEYS.A)
    state.lVelocity = lVelocity > -20 ? lVelocity - 2 : -20;

  state.shipX = shipX + state.lVelocity + state.rVelocity;

  if (key === KEYS.SPACE) {
    window.location.reload();
  }

  return state;
};

// Creates 'n' star elements with animation
// Returns array of stars
export const addStars = n => {
  const rX = () => randomUpTo(maxX);
  const rDelay = () => 0 - randomUpTo(4800);

  const stars = [];
  for (let i = 0; i < n; ++i) {
    stars.push(
      <SmStarSC key={"a" + i} x={rX()} sp={12} delay={rDelay()} />,
      <MdStarSC key={"b" + i} x={rX()} sp={8} delay={rDelay()} />,
      <LgStarSC key={"c" + i} x={rX()} sp={6} delay={rDelay()} />
    );
  }

  return stars;
};

// Creates 'n' amount of enemies for the game
// Returns an array of Enemy components
export const addEnemies = n => [...Array(n).keys()].map(i => <Enemy key={i} />);

// Random number from one up to the parameter
export const randomUpTo = upperLimit => Math.floor(Math.random() * upperLimit);

export const initialState = () => ({
  score: 0,
  shipX: 490,
  rVelocity: 0,
  lVelocity: 0,
  isShipHit: false
});
