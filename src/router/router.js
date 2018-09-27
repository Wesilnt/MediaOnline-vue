import Vue from 'vue'
import Router from 'vue-router'

import NavBar from '../components/NavBar'
// import Home from "../views/Home";
// import VisionList from '../views/VisionList'
// import VideoList from '../views/onlineCourse/VideoList'
// import VisionDetail from '../views/VisionDetail'
// import videoColumnDetail from '../views/onlineCourse/videoColumnDetail.vue'
import FreeZone from '../views/freezone/FreeZone.vue' //首页-免费专区
import SharePoster from '../components/share/SharePoster.vue' //分享海报
import PageLoading from '../components/PageLoading'

import PageInfo_From_Home from './router_home'
import PageInfo_From_My from './router_my'
import PageInfo_From_OnlineCourse from './router_onlineCourse'
import PageInfo_From_Readings from './router_readings'
import PageInfo_From_Audio from './router_audio'
import PageInfo_From_Praise from './router_praise'

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home')
const My = () => import(/* webpackChunkName: "my" */ '../views/My')

const MyHOB = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('../views/My'),
  // 异步组件加载时使用的组件
  loading: PageLoading,
  // 加载失败时使用的组件
  error: null,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 2000,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})

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
        { path: '', component: Home },
        { path: 'home', component: Home },
        {
          path: 'my',
          component: MyHOB
        }
      ]
    },
    {
      path: '/home/freezone',
      name: 'FreeZone',
      component: FreeZone
    },
    {
      path: '/share/poster',
      name: 'SharePoster',
      component: SharePoster
    },
    ...PageInfo_From_Home,
    ...PageInfo_From_My,
    ...PageInfo_From_OnlineCourse,
    ...PageInfo_From_Readings,
    ...PageInfo_From_Audio,
    ...PageInfo_From_Praise
  ]
})
