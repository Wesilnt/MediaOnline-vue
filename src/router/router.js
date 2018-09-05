import Vue from "vue";
import Router from "vue-router";
import NavBar from "../components/NavBar";
import Home from "../views/Home";
import My from "../views/My";
import VisionList from '../views/VisionList'
import VideoList from '../views/onlineCourse/VideoList' 
import VisionDetail from '../views/VisionDetail'
import videoColumnDetail from '../views/onlineCourse/videoColumnDetail.vue'
import FreeZone from '../views/freezone/FreeZone.vue'              //首页-免费专区
import Readings from '../views/readings/Readings.vue'              //首页-读书会
import BookDetail from '../views/readings/BookDetail.vue'          //读书会-书详情
import BookSummary from '../views/readings/BookSummary.vue'        //书详情-书简介
import AudioPlay from '../components/audio/AudioPlay.vue'          //音频-播放
import AudioCmts from '../components/audio/AudioCmts.vue'          //音频-评论
import AudioDraft from '../components/audio/AudioDraft.vue'        //音频-文稿
import Praise from '../views/praise/Praise.vue'                    //集赞

Vue.use(Router);

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
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
      path: '/home/freezone',
      name: 'FreeZone',
      component: FreeZone
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
    { path:'/videoColumnDetail',
      name:'videoColumn',
      component:videoColumnDetail
    },
    {
      path:"/audio/audioplay",
      name:"AudioPlay",
      component:AudioPlay
    },
    {
      path:"/audio/audiocmts",
      name:"AudioCmts",
      component:AudioCmts
    },
    {
      path:"/audio/audiodraft",
      name:"AudioDraft",
      component:AudioDraft
    },
    {
      path:"/praise",
      name:"Praise",
      component:Praise
    }
  ]
});
