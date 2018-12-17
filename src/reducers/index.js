import * as ControlActionTypes from "../actionTypes";
import { sounds, colorSchemes } from "../assets";
import {
  parseScore,
  getNextColorScheme,
  fetchRandomButtonIndex
} from "../helpers";

const initialState = {
  score: "000",
  hScore: "000",
  colorScheme: 0,
  isPlaying: false,
  inputPause: false,
  currentButton: null,
  playbackSequence: [],
  playerPlaybackSequence: [],
  buttonColors: colorSchemes
};

export default function Control(state = initialState, action) {
  switch (action.type) {
    case ControlActionTypes.GAME_END: {
      return {
        ...state,
        score: "000",
        isPlaying: false,
        currentButton: null,
        playbackSequence: [],
        playerPlaybackSequence: []
      };
    }

    case ControlActionTypes.GAME_START: {
      const playbackSequence = [
        ...state.playbackSequence,
        fetchRandomButtonIndex()
      ];

      if (state.isPlaying) {
        return Control(state, { type: ControlActionTypes.GAME_END });
      }

      return {
        ...state,
        isPlaying: true,
        playbackSequence
      };
    }

    case ControlActionTypes.ALLOW_INPUT: {
      return {
        ...state,
        inputPause: false
      };
    }

    case ControlActionTypes.HALT_INPUT: {
      return {
        ...state,
        inputPause: true
      };
    }

    case ControlActionTypes.BUTTON_PRESS: {
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

          return Control(state, { type: ControlActionTypes.GAME_END });
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
        type: ControlActionTypes.ADD_TO_PLAYBACK_SEQUENCE
      });
    }

    case ControlActionTypes.ADD_TO_PLAYBACK_SEQUENCE: {
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

    case ControlActionTypes.GAME_CHANGE_COLOR_SCHEME: {
      return {
        ...state,
        colorScheme: getNextColorScheme(state)
      };
    }

    default:
      return state;
  }
}
