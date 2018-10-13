const videoColumnDetail = () => import(/* webpackChunkName: "index" */ '../views/onlineCourse/videoColumnDetail')
const videoCourseDetail = () => import(/* webpackChunkName: "index" */ '../views/onlineCourse/videoCourseDetail')
const videoCourseComment = () => import(/* webpackChunkName: "index" */ '../views/onlineCourse/VideoCourseCmts')


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
