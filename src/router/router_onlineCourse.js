import videoColumnDetail from '../views/onlineCourse/videoColumnDetail.vue'
import videoCourseDetail from '../views/onlineCourse/videoCourseDetail'
import videoCourseComment from '../views/onlineCourse/VideoCourseCmts.vue'

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
  {
    path: '/videoCourseCmts/:courseId',
    name: 'videoCourseCmts',
    component: videoCourseComment
  }
]

export default PageInfo_From_onlineCourse
