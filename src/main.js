// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import FastClick from 'fastclick'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

import App from './App'
import router from './router'
import store from './store'

// 由于 Android 4.4.2 中发现 service worker 无法正常使用（页面打开显示白屏，可能其他较低系统版本也有该问题），所以默认不使用
// 如不考虑兼容 Android 6 之前系统，且确实需要使用 service worker 可以自行取消注释
// 如果需要使用 service worker 还需要在项目根目录下添加 service-worker.js 文件，具体该文件如何写，需要使用者研究下 service worker 用法
// import registerServiceWorker from './registerServiceWorker'

import './i18n/vuex-i18n'
import './utils/directives'
import './utils/filters'

Vue.use(Mint)

// 如果是 alpha:上线前测试，引入 vconsole 调试工具
if (process.env.CONFIG_ENV === 'alpha') {
  const VConsole = require('vconsole')
  new VConsole() // eslint-disable-line
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

FastClick.attach(document.body)
sync(store, router)
// registerServiceWorker()
