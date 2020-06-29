import React from 'react';
import PropTypes from 'prop-types';

import { ParScore, NumberScore } from '../../styles/score';

const INCOMPLETE = 'INCOMPLETE';

const AttemptScore = ({ type, score, style }) => {
  const parsed = score === INCOMPLETE ? score : parseInt(score, 0);
  return type === 'number' ? (
    <NumberScore>{score}</NumberScore>
  ) : (
    <ParScore
      style={style}
      className={
        parsed === INCOMPLETE
          ? 'incomplete'
          : parsed > 3
          ? 'over2'
          : parsed > 1
          ? 'over1'
          : parsed > -1
          ? 'even'
          : 'under1'
      }
    >
      {score}
    </ParScore>
  );
};

export default AttemptScore;

AttemptScore.propTypes = {
  type: PropTypes.string,
  score: PropTypes.number,
  style: PropTypes.object
};
