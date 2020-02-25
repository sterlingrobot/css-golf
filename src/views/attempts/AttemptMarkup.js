import React from 'react';
import PropTypes from 'prop-types';

import Prism from 'prismjs';
import editor from '../../styles/editor';
import 'prismjs/components/prism-scss';

import 'prismjs/themes/prism.css';
import '../../styles/challenge.scss';

const setContent = css => {
  return {
    __html: Prism.highlight(css, Prism.languages.scss)
  };
};

const AttemptMarkup = ({ css }) => (
  <div className="markup" style={{ ...editor }}>
    <pre>
      <code language="css" dangerouslySetInnerHTML={setContent(css)} />
    </pre>
  </div>
);

export default AttemptMarkup;

AttemptMarkup.propTypes = {
  css: PropTypes.string
};
