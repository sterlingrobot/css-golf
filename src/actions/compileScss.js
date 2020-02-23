export const compileScss = async (prefix, id, css) => {
  const response = await fetch('/.netlify/functions/generate-styles', {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ prefix, id, css })
  });
  const { styles } = await response.json();
  return styles;
};
