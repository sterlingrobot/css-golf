import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/challenge.scss';

const setContent = html => {
  return { __html: html };
};

const AttemptOutput = ({ attempt, challenge }) => (
  <div id={`attempt-${attempt.id}`} className="attempt-output">
    <style>{attempt.style}</style>
    <div
      className="attempt-content"
      dangerouslySetInnerHTML={setContent(challenge.html)}
    ></div>
  </div>
);

export default AttemptOutput;

AttemptOutput.propTypes = {
  attempt: PropTypes.shape({
    id: PropTypes.string,
    style: PropTypes.string,
    snapshot: PropTypes.string
  }),
  challenge: PropTypes.shape({
    html: PropTypes.string
  })
};
