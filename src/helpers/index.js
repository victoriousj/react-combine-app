import spaceBarrage from './spaceBarrageHelpers';
import simonSays from './simonSaysHelpers';
import connect4 from './connect4Helpers';

export const spaceBarrageHelpers = spaceBarrage();
export const simonSaysHelpers = simonSays();
export const connect4Helpers = connect4();

export const helpers = {
  randomUpTo: (upperLimit) => Math.floor(Math.random() * upperLimit),
};
