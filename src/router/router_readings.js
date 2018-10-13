const Readings = () => import(/* webpackChunkName: "index" */ '../views/readings/Readings') //首页-读书会
const BookDetail = () => import(/* webpackChunkName: "index" */ '../views/readings/BookDetail') //读书会-书详情
const BookSummary = () => import(/* webpackChunkName: "index" */ '../views/readings/BookSummary')//书详情-书简介

export default [
  {
    path: '/home/readings',
    name: 'Readings',
    component: Readings
  },
  {
    path: '/home/readings/book/:courseId',
    name: 'BookDetail',
    component: BookDetail
  },
  {
    path: '/home/readings/summary',
    name: 'BookSummary',
    component: BookSummary
  }
]
