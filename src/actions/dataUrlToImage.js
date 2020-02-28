const dataUrlToImage = data =>
  new Promise((resolve, _reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(this);
    };
    image.src = data;
  });

export default dataUrlToImage;
