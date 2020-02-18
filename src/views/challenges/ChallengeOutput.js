/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

const setContent = html => {
  return { __html: html };
};

export const ChallengeOutput = ({ challenge }) => (
  <div id={challenge.id} className="challenge-container">
    <style>{challenge.style}</style>
    <div
      className="challenge-content"
      dangerouslySetInnerHTML={setContent(challenge.html)}
    ></div>
  </div>
);

ChallengeOutput.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.string,
    html: PropTypes.string,
    css: PropTypes.string,
    style: PropTypes.string
  })
};
