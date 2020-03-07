const Canvas = require('canvas');

const dataUrlToImage = data => {
  return new Promise((resolve, _reject) => {
    const image = new Canvas.Image();
    image.onload = (_e => {
      return function() {
        resolve(this);
      };
    })();
    image.src = data;
  });
};
export default dataUrlToImage;
