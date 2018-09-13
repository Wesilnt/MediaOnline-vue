import FreeList from '../views/FreeList'
import VisionList from '../views/onlineVision/VisionList'
import VideoList from '../views/onlineCourse/VideoList'
import BookList from '../views/BookList'
import VisionDetail from '../views/onlineVision/VisionDetail'
import visionCourseList from '../views/onlineVision/visionCourseList'

const PageInfo_From_Home = [
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
  {
    path: '/home/visionDetail/visionCourseList',
    name: 'visionCourseList',
    component: visionCourseList,
    props: true
  }
]
export default PageInfo_From_Home
