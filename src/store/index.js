import Vue from 'vue'
import Vuex from 'vuex'

import helloWorld from './modules/helloWorld'

Vue.use(Vuex)

// https://vuex.vuejs.org/zh-cn/getting-started.html
export default new Vuex.Store({
  modules: {
    helloWorld,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  strict: process.env.NODE_ENV !== 'production', // 严格模式
})
