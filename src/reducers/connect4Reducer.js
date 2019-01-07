import * as actionTypes from '../actionTypes';
import { connect4Helpers } from '../helpers';

const initialState = {
  isPlaying: true,
  currentPlayer: 1,
  winningPieces: [],
  showOverlay: false,
  gameBoard: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PIECE: {
      if (!state.isPlaying) return state;

      const newState = { ...state };

      newState.gameBoard[action.columnIndex][action.rowIndex] =
        newState.currentPlayer;

      const winningPieces = connect4Helpers.checkGameBoard(state.gameBoard);
      if (winningPieces) {
        newState.winningPieces = winningPieces;
        newState.showOverlay = true;
        newState.isPlaying = false;
      } else {
        newState.currentPlayer = newState.currentPlayer === 1 ? 2 : 1;
      }

      return newState;
    }

    case actionTypes.RESET_GAME: {
      return {
        isPlaying: true,
        currentPlayer: 1,
        playerOneTime: 0,
        playerTwoTime: 0,
        winningPieces: [],
        showOverlay: false,
        gameBoard: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
        ],
      };
    }

    default: {
      return state;
    }
  }
};
