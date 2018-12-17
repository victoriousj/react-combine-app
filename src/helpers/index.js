export const fetchRandomButtonIndex = () => Math.floor(Math.random() * 4);

export const delay = x => new Promise(r => setTimeout(r, x));

export const getNextColorScheme = state =>
  state.buttonColors.length !== ++state.colorScheme ? state.colorScheme : 0;

export const parseScore = state => {
  let s = parseInt(state.score);
  let hs = parseInt(state.highScore);
  const parsedScore = ++s < 10 ? `00${s}` : s < 99 ? `0${s}` : s;
  const parsedHighScore = s > hs ? parsedScore : state.highScore;

  return {
    ...state,
    score: parsedScore,
    highScore: parsedHighScore
  };
};
