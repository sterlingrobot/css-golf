import Canvas from 'canvas';

const dataUrlToImage = data => {
  return new Promise((resolve, _reject) => {
    const image =
      'undefined' === typeof Image ? new Canvas.Image() : new Image();
    image.onload = (_e => {
      return function() {
        resolve(this);
      };
    })();
    image.src = data;
  });
};
export default dataUrlToImage;
