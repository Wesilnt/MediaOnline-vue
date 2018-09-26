import Readings from '../views/readings/Readings.vue' //首页-读书会
import BookDetail from '../views/readings/BookDetail.vue' //读书会-书详情
import BookSummary from '../views/readings/BookSummary.vue' //书详情-书简介

export default [
  {
    path: '/home/readings',
    name: 'Readings',
    component: Readings
  },
  {
    path: '/home/readings/book',
    name: 'BookDetail',
    component: BookDetail
  },
  {
    path: '/home/readings/summary',
    name: 'BookSummary',
    component: BookSummary
  }
]
