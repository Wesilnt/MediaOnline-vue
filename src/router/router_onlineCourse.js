import videoColumnDetail from  '../views/onlineCourse/videoColumnDetail.vue'
import videoCourseDetail from  '../views/onlineCourse/videoCourseDetail'
import Praise from '../views/praise/Praise'

const PageInfo_From_onlineCourse = [
  {
    path: '/videoColumnDetail/:courseId',
    name: 'videoColumnDetail',
    component: videoColumnDetail
  },
  {
    path: '/videoCourseDetail/:lessonId',
    name: 'videoCourseDetail',
    component: videoCourseDetail
  },
]

export default PageInfo_From_onlineCourse
