import React from 'react';
import PropTypes from 'prop-types';

import { ParScore } from '../../styles/par-score';

const INCOMPLETE = 'INCOMPLETE';

const AttemptScore = ({ score, style }) => {
  const parsed = score === INCOMPLETE ? score : parseInt(score, 0);
  return (
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
  score: PropTypes.string,
  style: PropTypes.object
};
