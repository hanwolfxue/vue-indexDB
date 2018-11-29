import Vue from 'vue'
import store from '@/store'
import HelloWorld from '@/views/HelloWorld'

describe('views/HelloWorld/index.vue', () => {
  const Constructor = Vue.extend(HelloWorld)
  const vm = new Constructor({ store }).$mount()

  it('应该渲染的正确内容', () => {
    expect(vm.$el.querySelector('.hello h1').textContent).toEqual('Welcome to Your Vue.js App')
  })
})
