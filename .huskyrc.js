module.exports = {
  hooks: {
    'pre-commit': 'lint-staged',
    'pre-push': 'yarn build',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
