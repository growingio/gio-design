module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-rational-order', 'stylelint-prettier/recommended'],
  plugins: [
    'stylelint-order',
    'stylelint-config-rational-order/plugin',
    'stylelint-declaration-block-no-ignored-properties',
  ],
  rules: {
    'order/properties-order': [[], { severity: 'warning' }],
    'plugin/rational-order': [
      true,
      {
        'empty-line-between-groups': true,
        severity: 'warning',
      },
    ],
    'plugin/declaration-block-no-ignored-properties': true,
    'declaration-empty-line-before': null,
  },
};
