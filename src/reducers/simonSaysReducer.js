import * as actionTypes from '../actionTypes';
import { sounds, colorSchemes } from '../assets';
import { simonSaysHelpers, helpers } from '../helpers';

const initialState = {
  score: '000',
  hScore: '000',
  colorScheme: 0,
  isPlaying: false,
  inputPause: false,
  currentButton: null,
  playbackSequence: [],
  playerPlaybackSequence: [],
  buttonColors: colorSchemes,
};

export default function Control(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GAME_END: {
      return {
        ...state,
        score: '000',
        isPlaying: false,
        currentButton: null,
        playbackSequence: [],
        playerPlaybackSequence: [],
      };
    }

    case actionTypes.GAME_START: {
      const playbackSequence = [...state.playbackSequence, helpers.randomUpTo(4)];

      if (state.isPlaying) {
        return Control(state, { type: actionTypes.GAME_END });
      }

      return {
        ...state,
        isPlaying: true,
        playbackSequence,
      };
    }

    case actionTypes.ALLOW_INPUT: {
      return {
        ...state,
        inputPause: false,
      };
    }

    case actionTypes.HALT_INPUT: {
      return {
        ...state,
        inputPause: true,
      };
    }

    case actionTypes.BUTTON_PRESS: {
      const newPlayerPlaybackSequence = [...state.playerPlaybackSequence, action.buttonIndex];

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
          playerPlaybackSequence: newPlayerPlaybackSequence,
        };
      }

      const soundEffect = new Audio();
      soundEffect.volume = 0.6;
      soundEffect.src = sounds[5];
      setTimeout(() => soundEffect.play(), 200);

      state = simonSaysHelpers.parseScore(state);

      return Control(state, {
        type: actionTypes.ADD_TO_PLAYBACK_SEQUENCE,
      });
    }

    case actionTypes.ADD_TO_PLAYBACK_SEQUENCE: {
      const newPlaybackSequence = [...state.playbackSequence, helpers.randomUpTo(4)];

      return {
        ...state,
        playerPlaybackSequence: [],
        playbackSequence: newPlaybackSequence,
      };
    }

    case actionTypes.GAME_CHANGE_THEME: {
      return {
        ...state,
        colorScheme: simonSaysHelpers.getNextColorScheme(state),
      };
    }

    default:
      return state;
  }
}
