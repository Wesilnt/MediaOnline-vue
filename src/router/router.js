/** @format */
import Vue from 'vue'
import Router from 'vue-router'
import NavBar from '../components/NavBar'
import PageInfo_From_Home from './router_home'
import PageInfo_From_My from './router_my'
import PageInfo_From_OnlineCourse from './router_onlineCourse'
import PageInfo_From_Audio from './router_audio'
import PageInfo_From_Praise from './router_praise'

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home')
const My = () => import(/* webpackChunkName: "index" */ '../views/My')
const ColumnDetail = () =>
  import(/* webpackChunkName: "index" */ '../views/ColumnDetail')
const Payment = () =>
  import(/* webpackChunkName: "index" */ '../components/Payment')
const ColumnList = () =>
  import(/* webpackChunkName: "index" */ '../views/ColumnList')

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      component: NavBar,
      redirect: '/home',

      children: [
        {
          path: 'home',
          name: 'HOME',
          component: Home,
          meta: { navHide: true }
        },
        {
          path: '/my',
          component: My,
          meta: { navHide: true }
        }
      ]
    },
    {
      path: '/detail/:columnType/:courseId',
      name: 'ColumnDetail',
      component: ColumnDetail,
        meta: { navMarginBottom: 61 }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/home/:columnType/columnlist',
      name: 'ColumnList',
      component: ColumnList
    },
    {
      path: '/home/readings/summary',
      name: 'BookSummary',
      component: () =>
        import(/* webpackChunkName: "index" */ '../views/readings/BookSummary') //书详情-书简介
    },
    ...PageInfo_From_Home,
    ...PageInfo_From_My,
    ...PageInfo_From_OnlineCourse,
    ...PageInfo_From_Audio,
    ...PageInfo_From_Praise
  ]
})
