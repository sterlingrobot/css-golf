const sass = require('sass');

module.exports.handler = async (event, _context) => {
  const { prefix, id, css } = JSON.parse(event.body);
  try {
    const styles = sass
      .renderSync({
        data: `
          #${prefix}-${id} { ${css} }
        `,
        includePaths: [
          'node_modules',
          'node_modules/@wisetail/tokens/build/scss'
        ]
      })
      .css.toString('utf-8');

    return {
      statusCode: 200,
      body: JSON.stringify({ styles })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.toString()
      })
    };
  }
};
