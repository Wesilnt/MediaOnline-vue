const purchase = () => import("../views/my/Purchase")
const record = () => import("../views/my/Record")
const like = () => import("../views/my/Like")
const reply = () => import("../views/my/Reply")
const myPuzzle_Praise = () =>
  import(/* webpackChunkName: "myPuzzle_Praise" */ '../views/my/MyPuzzle_Praise')
const sysMessage = () => import("../views/my/SysMessage")
const help = () => import("../views/my/Help")

const PageInfo_From_My = [
  {
    path: '/my/Purchase',
    // name: "MyPurchase",
    // component: purchase
    component: purchase
  },
  {
    path: '/my/Record',
    // name: "VisionList",
    component: record
  },
  {
    path: '/my/Like',
    // name: "VisionDetail",
    component: like,
    props: true
  },
  {
    path: '/my/my-puzzle',
    // name: "VideoList",
    component: myPuzzle_Praise
  },
  {
    path: '/my/Reply',
    // name: "BookList",
    component: reply
  },
  {
    path: '/my/my-praise',
    // name: "BookList",
    component: myPuzzle_Praise
  },
  {
    path: '/my/SysMessage',
    // name: "BookList",
    component: sysMessage
  },
  {
    path: '/my/Help',
    // name: "BookList",
    component: help
  }
]

export default PageInfo_From_My
