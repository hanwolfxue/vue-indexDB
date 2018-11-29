// https://github.com/typicode/husky

const config = require('./config')

module.exports = {
  hooks: {
    'pre-commit': config.dev.useEslint || config.dev.useStylelint ? 'lint-staged' : '',
    'commit-msg': 'commitlint -e $GIT_PARAMS',
  },
}
