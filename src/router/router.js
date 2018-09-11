import Vue from 'vue'
import Router from 'vue-router'

import NavBar from '../components/NavBar'
// import Home from "../views/Home";
// import VisionList from '../views/VisionList'
// import VideoList from '../views/onlineCourse/VideoList'
// import VisionDetail from '../views/VisionDetail'
// import videoColumnDetail from '../views/onlineCourse/videoColumnDetail.vue'
import FreeZone from '../views/freezone/FreeZone.vue' //首页-免费专区
import Readings from '../views/readings/Readings.vue' //首页-读书会
import BookDetail from '../views/readings/BookDetail.vue' //读书会-书详情
import BookSummary from '../views/readings/BookSummary.vue' //书详情-书简介
import AudioPlay from '../components/audio/AudioPlay.vue' //音频-播放
import AudioCmts from '../components/audio/AudioCmts.vue' //音频-评论
import AudioDraft from '../components/audio/AudioDraft.vue' //音频-文稿
import Praise from '../views/praise/Praise.vue' //集赞
import SharePoster from '../components/SharePoster.vue' //分享海报
import PageLoading from '../components/PageLoading'

import PageInfo_From_Home from './router_home'
import PageInfo_From_My from './router_my'
import PageInfo_From_OnlineCourse from './router_onlineCourse'

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
    // {
    //   path: '/home/visionList',
    //   name: 'VisionList',
    //   component: VisionList
    // },
    // {
    //   path: '/home/visionDetail/:id',
    //   name: 'VisionDetail',
    //   component: VisionDetail,
    //   props: true
    // },
    // {
    //   path: '/home/videoList',
    //   name: 'VideoList',
    //   component: VideoList
    // },
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
    },
    // { path:'/videoColumnDetail',
    //   name:'videoColumn',
    //   component:videoColumnDetail
    // },
    {
      path: '/audio/audioplay',
      name: 'AudioPlay',
      component: AudioPlay
    },
    {
      path: '/audio/audiocmts/:lessonid',
      name: 'AudioCmts',
      component: AudioCmts
    },
    {
      path: '/audio/audiodraft/:lessonid',
      name: 'AudioDraft',
      component: AudioDraft
    },
    {
      path: '/praise',
      name: 'Praise',
      component: Praise
    },
    {
      path: '/share/poster',
      name: 'SharePoster',
      component: SharePoster
    },
    ...PageInfo_From_Home,
    ...PageInfo_From_My,
    ...PageInfo_From_OnlineCourse
  ]
})
