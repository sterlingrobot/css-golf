import { createCanvas, createImageData } from 'canvas';
import pixelmatch from 'pixelmatch';
import generateDiffData from './generateDiffData';

const DIFF_OPTIONS = {
  threshold: 0.1,
  diffMask: true
};

const getTotalNonAlphaPixels = (imgData, width) => {
  let column = 0,
    row = 0;
  const all = imgData.length;
  for (let i = 0; i < all; i += 4) {
    let alpha = imgData[i + 3];
    if (alpha > 0) {
      column = Math.max(column, (i % width) / 4);
      row = Math.max(row, Math.floor(i / width) / 4);
    }
  }
  return column * row;
};

const diffPixels = ({ target, match, width, height, options }) => {
  const imgDataOutput = createImageData(width, height);
  let totalPixels = getTotalNonAlphaPixels(target, width);
  const diffPixels = pixelmatch(
    target,
    match,
    imgDataOutput.data,
    width,
    height,
    {
      ...DIFF_OPTIONS,
      ...options
    }
  );
  return Promise.resolve({
    totalPixels,
    diffPixels,
    snapshot: writeDiffToSnapshot(imgDataOutput)
  });
};

const writeDiffToSnapshot = imgDataOutput => {
  const canvas = createCanvas(imgDataOutput.width, imgDataOutput.height);
  const ctx = canvas.getContext('2d');

  ctx.putImageData(imgDataOutput, 0, 0);

  return canvas.toDataURL();
};

const diffAttemptSnapshot = (target, match, options) =>
  generateDiffData(target, match).then(imgData =>
    diffPixels({ ...imgData, ...{ options } })
  );

export default diffAttemptSnapshot;
