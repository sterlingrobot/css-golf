import React from 'react';

// eslint-disable-next-line react/display-name
const DiffOutput = React.forwardRef((_props, ref) => (
  <canvas className="diff-output" ref={ref}></canvas>
));

export default DiffOutput;
