import Vue from 'vue'
import Router from 'vue-router'
import NavBar from '../components/NavBar'
import PageInfo_From_Home from './router_home'
import PageInfo_From_My from './router_my'
import PageInfo_From_OnlineCourse from './router_onlineCourse'
import PageInfo_From_Readings from './router_readings'
import PageInfo_From_Audio from './router_audio'
import PageInfo_From_Praise from './router_praise'

const Home = () => import(/* webpackChunkName: "index" */ '../views/Home')
const My = () => import(/* webpackChunkName: "index" */ '../views/My')

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
          component: My
        }
      ]
    },
    ...PageInfo_From_Home,
    ...PageInfo_From_My,
    ...PageInfo_From_OnlineCourse,
    ...PageInfo_From_Readings,
    ...PageInfo_From_Audio,
    ...PageInfo_From_Praise
  ]
})
