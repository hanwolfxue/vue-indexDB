// import HelloWorld from '@/views/HelloWorld';
const Add = () => import('@/views/Add')

const routes = [
  {
    path: '/main/add',
    name: 'Add',
    component: Add,
  },
]

export default routes
