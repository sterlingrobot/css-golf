import React from 'react';
import PropTypes from 'prop-types';

import Prism from 'prismjs';
import editor from '../../styles/editor';

import 'prismjs/themes/prism.css';
import '../../styles/markup.scss';

const setContent = html => {
  return {
    __html: Prism.highlight(html, Prism.languages.html)
  };
};

const ChallengeMarkup = ({ html }) => (
  <div className="markup" style={{ ...editor }}>
    <pre>
      <code language="html" dangerouslySetInnerHTML={setContent(html)} />
    </pre>
  </div>
);

export default ChallengeMarkup;

ChallengeMarkup.propTypes = {
  html: PropTypes.string
};
