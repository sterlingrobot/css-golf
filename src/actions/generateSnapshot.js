import domtoimage from 'dom-to-image';

const createSnapshotContainer = (id, type) => {
  const container = document.createElement('div');
  const parent =
    document.querySelector('.challenge-container') ||
    document.querySelector('.attempt-container');
  const reference = parent.querySelector('.challenge-output');

  container.id = [type, id].join('-');
  container.className = `${type}-output`;
  if (reference) {
    parent.insertBefore(container, reference.nextSibling);
  } else {
    parent.appendChild(container);
  }
  return container;
};

const generateSnapshot = (id, type, markup, css) => {
  const container =
    document.getElementById([type, id].join('-')) ||
    createSnapshotContainer(id, type);

  const node =
    container.querySelector('.output-snapshot') ||
    document.createElement('div');

  node.className = 'output-snapshot';
  node.innerHTML = `
    <style>${css}</style>
    ${markup}
  `;

  const imgs = node.querySelectorAll('img');
  container.appendChild(node);

  if (imgs.length) {
    return Promise.all(
      Array.from(imgs).map(
        img => new Promise(resolve => (img.onload = () => resolve()))
      )
    ).then(() => domtoimage.toPng(node));
  }

  return domtoimage.toPng(node);
};

export default generateSnapshot;
