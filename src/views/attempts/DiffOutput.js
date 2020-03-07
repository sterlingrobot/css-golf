import React from 'react';
import PropTypes from 'prop-types';

import { OutputImg } from '../../styles/output';

const DiffOutput = ({ snapshot }) => (
  <div className="diff-output">
    <OutputImg src={snapshot} />
  </div>
);

export default DiffOutput;

DiffOutput.propTypes = {
  snapshot: PropTypes.string
};
