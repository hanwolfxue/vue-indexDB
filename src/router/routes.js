import home from './modules/home'
import detail from './modules/detail'
import add from './modules/add'

export default [
  ...home,
  ...detail,
  ...add,
  {
    path: '*',
    redirect: '/home',
  },
]
