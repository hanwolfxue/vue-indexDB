// import HelloWorld from '@/views/HelloWorld';
const Detail = () => import('@/views/Detail')

const routes = [
  {
    path: '/main/detail',
    name: 'Detail',
    component: Detail,
  },
]

export default routes
