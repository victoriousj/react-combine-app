import * as actionTypes from "../actionTypes";

export const endGame = () => ({ type: actionTypes.GAME_END });

export const startGame = () => ({ type: actionTypes.GAME_START });

export const haltInput = () => ({ type: actionTypes.HALT_INPUT });

export const allowInput = () => ({ type: actionTypes.ALLOW_INPUT });

export const addToPlaybackSequence = () => ({
  type: actionTypes.ADD_TO_PLAYBACK_SEQUENCE
});

export const buttonPress = buttonIndex => ({
  type: actionTypes.BUTTON_PRESS,
  buttonIndex
});

export const changeColorScheme = colorSchemeId => ({
  type: actionTypes.GAME_CHANGE_COLOR_SCHEME,
  colorSchemeId
});
