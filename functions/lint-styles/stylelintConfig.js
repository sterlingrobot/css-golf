const path = require('path');
module.exports = {
  extends: [path.resolve('node_modules', 'stylelint-config-sass-guidelines')],
  rules: {
    'max-nesting-depth': 1,
    'order/properties-alphabetical-order': null
  }
};
