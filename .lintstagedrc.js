// https://github.com/okonet/lint-staged

const config = require('./config')

const eslint = config.dev.useEslint ? { 'src/**/*.{js,jsx,vue}': 'eslint' } : {}
const stylelint = config.dev.useStylelint ? { 'src/**/*.{css,styl,stylus}': 'stylelint' } : {}

module.exports = {
  ...eslint,
  ...stylelint,
}
