// a generic error page to show whenever something goes wrong in other views

import React from 'react';
import PropTypes from 'prop-types';

import { ExternalLink } from '../../styles/links';

const Error = ({ error }) => (
  <div>
    <h1>Whoops</h1>
    <p>{`Sorry, something went wrong. We're looking into it.`}</p>
    <div style={{ fontFamily: 'monospace' }}>
      {error ? error.message : null}
    </div>
    <ExternalLink href="/">Go to the homepage</ExternalLink>
  </div>
);

export default Error;

Error.propTypes = {
  error: PropTypes.instanceOf(Error)
};
