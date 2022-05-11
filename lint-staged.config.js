module.exports = {
  '*.(j|t)s?(x)': () => 'eslint --cache --fix',
  '*.less': 'stylelint --custom-syntax postcss-less --fix',
};
