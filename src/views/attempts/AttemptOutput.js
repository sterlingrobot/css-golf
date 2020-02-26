import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/challenge.scss';
import { OutputImg } from '../../styles/challenge';

const setContent = html => {
  return { __html: html };
};

// eslint-disable-next-line react/display-name
const AttemptOutput = React.forwardRef(
  ({ attempt, challenge, isCompare }, ref) => (
    <div id={`attempt-${attempt.id}`} className="attempt-output" ref={ref}>
      {isCompare ? (
        <OutputImg src={attempt.snapshot} />
      ) : (
        <>
          <style>{attempt.style}</style>
          <div
            className="attempt-content"
            dangerouslySetInnerHTML={setContent(challenge.html)}
          ></div>
        </>
      )}
    </div>
  )
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
  }),
  isCompare: PropTypes.bool
};
