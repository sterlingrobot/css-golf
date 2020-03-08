import { createCanvas, createImageData } from 'canvas';
import pixelmatch from 'pixelmatch';
import generateDiffData from './generateDiffData';

const DIFF_OPTIONS = {
  threshold: 0.1,
  diffMask: true
};

const getTotalNonAlphaPixels = imgData => {
  const all = imgData.length;
  let total = 0;
  for (let i = 0; i < all; i += 4) {
    if (imgData[i + 3] > 0) {
      total++;
    }
  }
  return total;
};

const diffPixels = ({ target, match, width, height, options }) => {
  const imgDataOutput = createImageData(width, height);
  let totalPixels = getTotalNonAlphaPixels(target);
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
