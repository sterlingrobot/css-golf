const path = require('path');
const sass = require('sass');

module.exports.handler = async (event, _context) => {
  const { prefix, id, css } = JSON.parse(event.body);
  try {
    const styles = sass
      .renderSync({
        data: `
          @import 'variables';
          @import 'mixins';

          #${prefix}-${id} { ${css} }
        `,
        includePaths: [
          path.resolve('node_modules'),
          path.resolve('node_modules', '@wisetail/tokens/build/scss')
        ]
      })
      .css.toString('utf-8');

    return {
      statusCode: 200,
      body: JSON.stringify({
        styles,
        paths: {
          dirname: __dirname,
          node_modules: path.resolve('node_modules'),
          tokens: path.resolve('node_modules', '@wisetail/tokens/build/scss')
        }
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
};
