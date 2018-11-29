// https://cn.vuejs.org/v2/api/#Vue-directive
import Vue from 'vue'

Vue.directive('example', (el, binding) => {
  console.log(el)
  console.log(binding)
})
