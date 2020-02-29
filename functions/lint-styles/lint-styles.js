const stylelint = require('stylelint');
const config = require('./stylelintConfig');

module.exports.handler = async (event, _context) => {
  const { css } = JSON.parse(event.body);
  try {
    return stylelint
      .lint({
        code: css,
        config,
        configBasedir: __dirname
      })
      .then(results => {
        return {
          statusCode: 200,
          body: JSON.stringify({ results })
        };
      });
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.toString() })
    };
  }
};
