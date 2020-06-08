module.exports = {
  '*.(j|t)s?(x)': () => 'eslint --cache --fix',
  '**/*.less': 'stylelint --syntax less --fix',
};
