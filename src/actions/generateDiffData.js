import dataUrlToImage from './dataUrlToImage';
import imgToUint8Array from './imageDataToArray';

const generateDiffData = (target, match) => {
  let width, height;
  return dataUrlToImage(target)
    .then(image => {
      width = image.width;
      height = image.height;
      return Promise.all([
        imgToUint8Array(target, width, height),
        imgToUint8Array(match, width, height)
      ]);
    })
    .then(([targetImg, matchImg]) => ({
      target: targetImg,
      match: matchImg,
      width: width,
      height: height
    }));
};

export default generateDiffData;
