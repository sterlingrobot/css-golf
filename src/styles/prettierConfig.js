export default options => {
  return {
    parser: 'js',
    useTabs: false,
    tabWidth: 2,
    endOfLine: 'lf',
    printWidth: 100,
    semi: true,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: 'avoid',
    ...options
  };
};
