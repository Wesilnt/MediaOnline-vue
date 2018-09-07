import FreeList from '../views/FreeList'
import PageLoading from '../components/PageLoading'
const myPuzzle_Praise = () =>
  import(/* webpackChunkName: "myPuzzle_Praise" */ '../views/my/MyPuzzle_Praise')
const help = () => import("../views/my/Help")
const PageInfo_From_My = [
  {
    path: '/my/my-purchase',
    // name: "MyPurchase",
    component: FreeList
  },
  {
    path: '/my/my-record',
    // name: "VisionList",
    component: FreeList
  },
  {
    path: '/my/my-like',
    // name: "VisionDetail",
    component: FreeList,
    props: true
  },
  {
    path: '/my/my-puzzle',
    // name: "VideoList",
    component: myPuzzle_Praise
  },
  {
    path: '/my/my-reply',
    // name: "BookList",
    component: FreeList
  },
  {
    path: '/my/my-praise',
    // name: "BookList",
    component: myPuzzle_Praise
  },
  {
    path: '/my/my-sysMessage',
    // name: "BookList",
    component: FreeList
  },
  {
    path: '/my/Help',
    // name: "BookList",
    component: help
  }
]

export default PageInfo_From_My
