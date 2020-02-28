import domtoimage from 'dom-to-image';

const generateSnapshot = (id, type, markup, css) => {
  const node = document.createElement('div');
  const style = document.createElement('style');
  const content = document.createElement('div');

  node.id = [type, id].join('-');
  node.appendChild(style);
  node.appendChild(content);
  content.innerHTML = markup;
  style.innerHTML = css;

  console.log(node);
  return domtoimage.toPng(node);
};

export default generateSnapshot;
