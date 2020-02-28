import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/challenge.scss';

const setContent = html => {
  return { __html: html };
};

// eslint-disable-next-line react/display-name
const AttemptOutput = React.forwardRef(({ attempt, html }, ref) => (
  <div id={`attempt-${attempt.id}`} className="attempt-output" ref={ref}>
    <style>{attempt.style}</style>
    <div
      className="attempt-content"
      dangerouslySetInnerHTML={setContent(html)}
    ></div>
  </div>
));

export default AttemptOutput;

AttemptOutput.propTypes = {
  attempt: PropTypes.shape({
    id: PropTypes.string,
    style: PropTypes.string,
    snapshot: PropTypes.string
  }),
  html: PropTypes.string
};
