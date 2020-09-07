module.exports = {
  hooks: {
    'pre-commit': 'pretty-quick --staged && lint-staged',
    'pre-push': 'yarn test',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
