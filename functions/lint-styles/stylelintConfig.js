require('stylelint-config-sass-guidelines');

module.exports = {
  extends: ['stylelint-config-sass-guidelines'],
  rules: {
    'max-nesting-depth': 1,
    'order/properties-alphabetical-order': null
  }
};
