// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  // 指定环境
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true,
  },
  // 全局变量
  "globals": {
    navigator: false,
    cordova: false,
    HandBridge: false,
    BMap: true,
    $config: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/recommended', 'standard'],
  // required to lint *.vue files
  plugins: ['vue', 'import'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    // 以下为自定义的 javascript 规则：
    // 箭头函数当只有一个参数时允许省略圆括号
    'arrow-parens': 0,
    // 允许生成器
    'generator-star-spacing': 0,
    // 对象和数组结尾强制分号
    "comma-dangle": [2, {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore",
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // 以下为自定义的 plugin-vue 规则：
    // 单行中允许多个属性
    "vue/max-attributes-per-line": ['error', {
      "singleline": 4,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    // 关闭属性名必须是 '-' 连接
    "vue/attribute-hyphenation": 0,

    // 以下为自定义的 plugin-import 规则：
    // https://github.com/benmosher/eslint-plugin-import
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    // 关闭必须默认输出
    'import/prefer-default-export': ['off'],
  }
}
