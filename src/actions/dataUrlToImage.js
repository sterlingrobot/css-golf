const dataUrlToImage = data => {
  return new Promise((resolve, _reject) => {
    const image = new Image();
    image.onload = img => {
      resolve(img);
    };
    image.src = data;
  });
};
export default dataUrlToImage;
