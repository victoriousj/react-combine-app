import * as actionTypes from '../actionTypes';

// Simon Says
export const endGame = () => ({ type: actionTypes.GAME_END });

export const startGame = () => ({ type: actionTypes.GAME_START });

export const haltInput = () => ({ type: actionTypes.HALT_INPUT });

export const allowInput = () => ({ type: actionTypes.ALLOW_INPUT });

export const addToPlaybackSequence = () => ({
  type: actionTypes.ADD_TO_PLAYBACK_SEQUENCE,
});

export const buttonPress = (buttonIndex) => ({
  type: actionTypes.BUTTON_PRESS,
  buttonIndex,
});

export const changeTheme = (colorSchemeId) => ({
  type: actionTypes.GAME_CHANGE_THEME,
  colorSchemeId,
});

// Connect4
export const resetGame = () => ({ type: actionTypes.RESET_GAME });

export const incTimer = () => ({ type: actionTypes.INC_TIMER });

export const addPiece = (rowIndex, columnIndex) => ({
  type: actionTypes.ADD_PIECE,
  rowIndex,
  columnIndex,
});
