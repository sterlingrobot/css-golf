module.exports = {
  extends: [
    '/opt/build/repo/functions/lint-styles/node_modules/stylelint-config-sass-guidelines'
  ],
  rules: {
    'max-nesting-depth': 1,
    'order/properties-alphabetical-order': null
  }
};
