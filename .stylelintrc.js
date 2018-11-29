// https://stylelint.io/user-guide/configuration

module.exports = {
  defaultSeverity: 'warning',
  extends: 'stylelint-config-standard',
  rules: {
    'rule-empty-line-before': null,
    'selector-list-comma-newline-after': 'always-multi-line',
  },
};
