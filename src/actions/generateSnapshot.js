import domtoimage from 'dom-to-image';

const generateSnapshot = (id, type, markup, css) => {
  const container = document.getElementById([type, id].join('-'));

  const node =
    container.querySelector('.output-snapshot') ||
    document.createElement('div');

  node.className = 'output-snapshot';
  node.innerHTML = `
    <style>${css}</style>
    ${markup}
  `;

  container.appendChild(node);

  return domtoimage.toPng(node);
};

export default generateSnapshot;
