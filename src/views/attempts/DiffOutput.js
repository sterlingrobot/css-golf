import React from 'react';
import PropTypes from 'prop-types';

import pixelmatch from 'pixelmatch';

const DIFF_OPTIONS = {
  threshold: 0.1,
  diffMask: true
};

class DiffOutput extends React.Component {
  constructor() {
    super();
    this.canvas = React.createRef();
    this.diffPixels.bind(this);
    this.writeDiffToOutput.bind(this);
  }

  diffPixels({ target, attempt, width, height, options }) {
    const imgDataOutput = new ImageData(width, height);
    const diff = pixelmatch(
      target,
      attempt,
      imgDataOutput.data,
      width,
      height,
      {
        ...DIFF_OPTIONS,
        ...options
      }
    );
    console.log(diff);
    this.writeDiffToOutput(imgDataOutput);
  }

  writeDiffToOutput(imgDataOutput) {
    const canvas = this.canvas.current;
    canvas.width = imgDataOutput.width;
    canvas.height = imgDataOutput.height;
    var ctx = canvas.getContext('2d');
    ctx.putImageData(imgDataOutput, 0, 0);
  }

  componentDidUpdate() {
    this.props.imgData && this.diffPixels(this.props.imgData);
  }

  render() {
    return (
      <canvas
        className="diff-output"
        ref={this.canvas}
        width="100%"
        height="0"
      ></canvas>
    );
  }
}
export default DiffOutput;

DiffOutput.propTypes = {
  imgData: PropTypes.shape({
    target: PropTypes.instanceOf(Uint8ClampedArray),
    attempt: PropTypes.instanceOf(Uint8ClampedArray),
    width: PropTypes.number,
    height: PropTypes.number,
    options: PropTypes.shape({
      threshold: PropTypes.number,
      includeAA: PropTypes.bool,
      alpha: PropTypes.number,
      aaColor: PropTypes.arrayOf(PropTypes.number),
      diffColor: PropTypes.arrayOf(PropTypes.number)
    })
  })
};
