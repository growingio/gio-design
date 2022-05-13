module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    'plugin/declaration-block-no-ignored-properties': true,
    'declaration-empty-line-before': null,
    'no-descending-specificity': null,
    'keyframes-name-pattern': null,
    'function-no-unknown': null,
    'custom-property-pattern': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'selector-class-pattern': null,
  },
};
