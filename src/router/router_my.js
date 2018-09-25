const purchase = () => import('../views/my/Purchase')
const record = () => import('../views/my/Record')
const like = () => import('../views/my/Like')
const reply = () => import('../views/my/Reply')
const myPuzzle_Praise = () =>
  import(/* webpackChunkName: "myPuzzle_Praise" */ '../views/my/MyPuzzle_Praise')
const sysMessage = () => import('../views/my/SysMessage')
const help = () => import('../views/my/Help')
const editUserInfo = () => import('../views/my/EditUserInfo')
const displayUserInfo = () => import('../views/my/DisplayUserInfo')
const WxConfig = () => import('../views/my/WxConfig')
const PageInfo_From_My = [
  {
    path: '/my/Purchase',
    component: purchase
  },
  {
    path: '/my/Record',
    component: record
  },
  {
    path: '/my/Like',
    component: like,
    props: true
  },
  {
    path: '/my/my-puzzle',
    component: myPuzzle_Praise
  },
  {
    path: '/my/Reply',
    component: reply
  },
  {
    path: '/my/my-praise',
    component: myPuzzle_Praise
  },
  {
    path: '/my/SysMessage',
    component: sysMessage
  },
  {
    path: '/my/Help',
    component: help
  },
  {
    path: '/my/EditUserInfo',
    component: editUserInfo
  },
  {
    path: '/my/DisplayUserInfo',
    component: displayUserInfo
  },
  {
    path: '/my/wx-config',
    component: WxConfig
  }
]

export default PageInfo_From_My
