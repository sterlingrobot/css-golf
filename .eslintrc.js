module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:react/recommended',
    'prettier'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  plugins: ['prettier', 'react'],
  rules: {
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
