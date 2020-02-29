import React from 'react';
import PropTypes from 'prop-types';

import pixelmatch from 'pixelmatch';
import generateDiffData from '../../actions/generateDiffData';

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

  getTotalNonAlphaPixels(imgData) {
    const all = imgData.length;
    let total = 0;
    for (let i = 0; i < all; i += 4) {
      if (imgData[i + 3] > 0) {
        total++;
      }
    }
    return total;
  }

  diffPixels({ target, match, width, height, options }) {
    const imgDataOutput = new ImageData(width, height);
    let totalPixels = this.getTotalNonAlphaPixels(target);
    const diff = pixelmatch(target, match, imgDataOutput.data, width, height, {
      ...DIFF_OPTIONS,
      ...options
    });
    this.writeDiffToOutput(imgDataOutput);
    return (
      this.props.onDiffResult && this.props.onDiffResult(totalPixels, diff)
    );
  }

  writeDiffToOutput(imgDataOutput) {
    const canvas = this.canvas.current;
    canvas.width = imgDataOutput.width;
    canvas.height = imgDataOutput.height;
    var ctx = canvas.getContext('2d');
    ctx.putImageData(imgDataOutput, 0, 0);
  }

  componentDidMount() {
    const { target, match, options } = this.props;
    generateDiffData(target, match).then(imgData =>
      this.diffPixels({ ...imgData, ...{ options } })
    );
  }

  componentDidUpdate() {
    const { target, match, options } = this.props;
    generateDiffData(target, match).then(imgData =>
      this.diffPixels({ ...imgData, ...{ options } })
    );
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
  onDiffResult: PropTypes.func,
  target: PropTypes.string,
  match: PropTypes.string,
  options: PropTypes.shape({
    threshold: PropTypes.number,
    includeAA: PropTypes.bool,
    alpha: PropTypes.number,
    aaColor: PropTypes.arrayOf(PropTypes.number),
    diffColor: PropTypes.arrayOf(PropTypes.number)
  })
};
