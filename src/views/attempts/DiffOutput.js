import React from 'react';

// eslint-disable-next-line react/display-name
const DiffOutput = React.forwardRef((_props, ref) => (
  <canvas className="diff-output" ref={ref} width="100%" height="0"></canvas>
));

export default DiffOutput;
