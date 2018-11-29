import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

// https://router.vuejs.org/zh-cn/api/options.html
export default new Router({
  routes,
  // mode: 'hash',
  // base: '/',
  // linkActiveClass: 'router-link-active',
  // linkExactActiveClass: 'router-link-exact-active',
  // fallback: true,
})
