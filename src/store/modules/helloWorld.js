const state = {
  increment: 0,
  list: [
    {
      id: '001',
      name: '路飞',
      age: 20,
      gender: '男',
      love: '吃东西',
      dream: '海贼王',
      position: '草帽海贼团船长',
    },
    {
      id: '002',
      name: '索隆',
      age: 20,
      gender: '男',
      love: '锻炼',
      dream: '天下第一剑豪',
      position: '战斗员',
    },
    {
      id: '003',
      name: '山治',
      age: 20,
      gender: '男',
      love: '烹饪',
      dream: 'All Blue',
      position: '草帽海贼团厨师',
    },
  ],
}

const getters = {}
Object.keys(state).forEach(prop => {
  getters[prop] = state => state[prop]
})

const mutations = {}
Object.keys(state).forEach(prop => {
  const setProp = `set${prop.charAt(0).toUpperCase()}${prop.slice(1)}`
  mutations[setProp] = (state, payload) => {
    state[prop] = payload
  }
})

// actions不做统一处理，因为大多数情况下，并不需要使用异步设置值
// 若需要使用actions，注意：mutation_type的命名规则为set开头加上state对象属性的camel形式
// const actions = {
//   async setIncrement({ commit }, value) {
//     commit('setIncrement', await value);
//   },
// };
const actions = {}

export default {
  state,
  getters,
  mutations,
  actions,
}
