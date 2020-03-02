export default options => {
  return {
    parser: 'js',
    useTabs: false,
    tabWidth: 2,
    endOfLine: 'lf',
    printWidth: 80,
    semi: true,
    singleQuote: true,
    bracketSpacing: true,
    trailingComma: 'all',
    jsxBracketSameLine: false,
    arrowParens: 'avoid',
    ...options
  };
};
