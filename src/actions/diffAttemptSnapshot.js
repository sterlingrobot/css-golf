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
  const imgDataOutput = new ImageData(width, height);
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
  return Promise.resolve({ totalPixels, diffPixels }, imgDataOutput);
};

const writeDiffToSnapshot = imgDataOutput => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = imgDataOutput.width;
  canvas.height = imgDataOutput.height;

  ctx.putImageData(imgDataOutput, 0, 0);

  return canvas.toDataURL();
};

const diffAttemptSnapshot = (target, match, options) =>
  generateDiffData(target, match)
    .then(imgData => diffPixels({ ...imgData, ...{ options } }))
    .then((diff, imgDataOutput) =>
      Promise.resolve({
        diff,
        snapshot: writeDiffToSnapshot(imgDataOutput)
      })
    );

export default diffAttemptSnapshot;
