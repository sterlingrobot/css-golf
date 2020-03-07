const Canvas = require('canvas');

const imgToUint8Array = (data, width, height) => {
  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext('2d');

  return new Promise((resolve, _reject) => {
    //create image, set src to base64 and onload draw to canvas
    const image = new Canvas.Image();
    image.onload = (ctx => {
      return function() {
        ctx.drawImage(this, 0, 0);

        //  a Uint8ClampedArray
        const imageData = ctx.getImageData(0, 0, width, height);
        resolve(imageData.data);
      };
    })(ctx);
    image.src = data;
  });
};

export default imgToUint8Array;
