import Vue from "vue";
import Router from "vue-router";
import NavBar from "../components/NavBar";
import Home from "../views/Home";
import My from "../views/My";
import FreeList from '../views/FreeList'
import VisionList from '../views/onlineVision/VisionList'
import VideoList from '../views/onlineCourse/VideoList'
import BookList from '../views/BookList'
import videoColumnDetail from '../views/onlineCourse/videoColumnDetail.vue'
import videoCourseDetail from '../views/onlineCourse/videoCourseDetail.vue'
import VisionDetail from '../views/onlineVision/VisionDetail'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: NavBar,
      redirect:'/home',
      children: [
        { path: "", component: Home },
        { path: "home", component: Home },
        {
          path: "my",
          component: My,
        }
      ]
    },
     {
      path: '/home/freeList',
      name: 'FreeList',
      component: FreeList
    },
    {
      path: '/home/visionList',
      name: 'VisionList',
      component: VisionList
    },
    {
      path: '/home/visionDetail/:id',
      name: 'VisionDetail',
      component: VisionDetail,
      props: true
    },
    {
      path: '/home/videoList',
      name: 'VideoList',
      component: VideoList
    },
    {
      path: '/home/bookList',
      name: 'BookList',
      component: BookList
    },
    { path:'/videoColumnDetail',
      name:'videoColumn',
      component:videoColumnDetail
    },
    { path:'/videoCourseDetail',
      name:'videoCourse',
      component:videoCourseDetail
    }
  ]
});
