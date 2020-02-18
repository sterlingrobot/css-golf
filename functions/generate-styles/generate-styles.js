const querystring = require('querystring');
const sass = require('node-sass');

exports.handler = async (event, context) => {
  const { id, css } = querystring.parse(event.body);

  try {
    const styles = sass.renderSync({
      data: `#${id} { ${css} }`,
      includePaths: '../node_modules/@wisetail/tokens/build/scss'
    }).css;

    return {
      statusCode: 200,
      body: JSON.stringify({ styles })
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
