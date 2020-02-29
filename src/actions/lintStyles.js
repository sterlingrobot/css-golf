const lintStyles = async css => {
  const response = await fetch('/.netlify/functions/lint-styles', {
    method: 'POST',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ css })
  });
  const { results, error } = await response.json();

  if (error) {
    return Promise.reject(error);
  }
  return Promise.resolve(results);
};

export default lintStyles;
