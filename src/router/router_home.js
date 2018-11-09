const FreeList = () => import(/* webpackChunkName: "index" */ '../views/FreeList')
const VisionList = () => import(/* webpackChunkName: "index" */ '../views/onlineVision/VisionList')
const VideoList = () => import(/* webpackChunkName: "index" */ '../views/onlineCourse/VideoList')
const BookList = () => import(/* webpackChunkName: "index" */ '../views/BookList')
const visionCourseList = () => import(/* webpackChunkName: "index" */ '../views/onlineVision/visionCourseList')
const FreeZone = () => import(/* webpackChunkName: "index" */ '../views/freezone/FreeZone')


const PageInfo_From_Home = [
  {
    path: '/home/freezone',
    name: 'FreeZone',
    component: FreeZone
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
    path: '/home/videoList',
    name: 'VideoList',
    component: VideoList
  },
  {
    path: '/home/bookList',
    name: 'BookList',
    component: BookList
  },
  {
    path: '/home/visionDetail/visionCourseList/:courseId',
    name: 'visionCourseList',
    component: visionCourseList,
    props: true
  }
]
export default PageInfo_From_Home
