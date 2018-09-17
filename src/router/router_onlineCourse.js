import videoColumnDetail from  '../views/onlineCourse/videoColumnDetail'
import videoCourseDetail from  '../views/onlineCourse/videoCourseDetail'
import Praise from '../views/praise/Praise'

const PageInfo_From_onlineCourse = [
  {
    path: '/videoColumnDetail/:courseId',
    name: 'videoColumnDetail',
    component: videoColumnDetail
  },
  {
    path: '/videoCourseDetail/:lessonID',
    name: 'videoCourseDetail',
    component: videoCourseDetail
  },
  {
    path: '/Praise/:courseId',
    name: 'Praise',
    component:Praise
  }
]

export default PageInfo_From_onlineCourse
