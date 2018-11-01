const videoColumnDetail = () => import(/* webpackChunkName: "index" */ '../views/onlineCourse/videoColumnDetail')
const videoCourseDetail = () => import(/* webpackChunkName: "index" */ '../views/onlineCourse/videoCourseDetail')
const videoCourseComment = () => import(/* webpackChunkName: "index" */ '../views/onlineCourse/VideoCourseCmts')
const videoInnerList = () => import(/* webpackChunkName: "index" */ '../views/onlineCourse/videoInnerList')



const PageInfo_From_onlineCourse = [
  // {
  //   path: '/home/videoColumnDetail/:courseId',
  //   name: 'videoColumnDetail',
  //   component: videoColumnDetail
  // },
  {
    path: '/detail/:columnType/:courseId/:lessonId',
    name: 'videoCourseDetail',
    component: videoCourseDetail
  },
  {
    path: '/videoCourseCmts/:courseId',
    name: 'videoCourseCmts',
    component: videoCourseComment
  },
  {
    path: '/videoInnerList/:columnType/:courseId',
    name: 'videoInnerList',
    component: videoInnerList
  }
]

export default PageInfo_From_onlineCourse
