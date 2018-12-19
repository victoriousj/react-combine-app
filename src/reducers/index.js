import * as actionTypes from "../actionTypes";
import { sounds, colorSchemes } from "../assets";
import {
  parseScore,
  checkGameBoard,
  getNextColorScheme,
  fetchRandomButtonIndex
} from "../helpers";

const initialState = {
  score: "000",
  hScore: "000",
  colorScheme: 0,
  isPlaying: true,
  inputPause: false,
  currentButton: null,
  playbackSequence: [],
  playerPlaybackSequence: [],
  buttonColors: colorSchemes,

  currentPlayer: 1,
  playerOneTime: 0,
  playerTwoTime: 0,
  showOverlay: false,
  gameBoard: [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ],
  winningPieces: []
};

const getInitialState = () => ({ ...initialState });

export default function Control(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case actionTypes.GAME_END: {
      return {
        ...state,
        score: "000",
        isPlaying: false,
        currentButton: null,
        playbackSequence: [],
        playerPlaybackSequence: []
      };
    }

    case actionTypes.GAME_START: {
      const playbackSequence = [
        ...state.playbackSequence,
        fetchRandomButtonIndex()
      ];

      if (state.isPlaying) {
        return Control(state, { type: actionTypes.GAME_END });
      }

      return {
        ...state,
        isPlaying: true,
        playbackSequence
      };
    }

    case actionTypes.ALLOW_INPUT: {
      return {
        ...state,
        inputPause: false
      };
    }

    case actionTypes.HALT_INPUT: {
      return {
        ...state,
        inputPause: true
      };
    }

    case actionTypes.BUTTON_PRESS: {
      const newPlayerPlaybackSequence = [
        ...state.playerPlaybackSequence,
        action.buttonIndex
      ];

      // Start at the end of the array and work back
      for (let i = newPlayerPlaybackSequence.length; i--; ) {
        if (state.playbackSequence[i] !== newPlayerPlaybackSequence[i]) {
          const soundEffect = new Audio();
          soundEffect.src = sounds[4];
          soundEffect.volume = 0.07;
          soundEffect.play();

          return Control(state, { type: actionTypes.GAME_END });
        }
      }

      if (state.playbackSequence.length !== newPlayerPlaybackSequence.length) {
        return {
          ...state,
          playerPlaybackSequence: newPlayerPlaybackSequence
        };
      }

      const soundEffect = new Audio();
      soundEffect.volume = 0.6;
      soundEffect.src = sounds[5];
      setTimeout(() => soundEffect.play(), 200);

      state = parseScore(state);

      return Control(state, {
        type: actionTypes.ADD_TO_PLAYBACK_SEQUENCE
      });
    }

    case actionTypes.ADD_TO_PLAYBACK_SEQUENCE: {
      const newPlaybackSequence = [
        ...state.playbackSequence,
        fetchRandomButtonIndex()
      ];

      return {
        ...state,
        playerPlaybackSequence: [],
        playbackSequence: newPlaybackSequence
      };
    }

    case actionTypes.GAME_CHANGE_COLOR_SCHEME: {
      return {
        ...state,
        colorScheme: getNextColorScheme(state)
      };
    }

    case actionTypes.ADD_PIECE: {
      if (!state.isPlaying) return state;

      const newState = { ...state };

      newState.gameBoard[action.columnIndex][action.rowIndex] =
        newState.currentPlayer;

      const winningPieces = checkGameBoard(state.gameBoard);
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
      return getInitialState();
    }

    case actionTypes.INC_TIMER: {
      if (!state.isPlaying) return state;

      state =
        state.currentPlayer === 1
          ? timePlayerOneTimer(state)
          : timePlayerTwoTimer(state);

      return state;
    }

    default:
      return state;
  }
}

const timePlayerOneTimer = state => ({
  ...state,
  playerOneTime: 1 + state.playerOneTime
});

const timePlayerTwoTimer = state => ({
  ...state,
  playerTwoTime: 1 + state.playerTwoTime
});
