import videoColumnDetail from  '../views/onlineCourse/videoColumnDetail'
import videoCourseDetail from  '../views/onlineCourse/videoCourseDetail'

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
  }
]

export default PageInfo_From_onlineCourse
