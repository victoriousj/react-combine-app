import React from 'react';

import { withContext } from '../../context';
import { ScoreSC } from './StyledComponents';

export default withContext((props) => <ScoreSC>{props.context.score}</ScoreSC>);
