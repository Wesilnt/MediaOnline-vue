const purchase = () => import(/* webpackChunkName: "index" */ '../views/my/Purchase')
const record = () => import(/* webpackChunkName: "index" */ '../views/my/Record')
const like = () => import(/* webpackChunkName: "index" */ '../views/my/Like')
const reply = () => import(/* webpackChunkName: "index" */ '../views/my/Reply')
const myPuzzle_Praise = () =>import(/* webpackChunkName: "index" */ '../views/my/MyPuzzle_Praise')
const sysMessage = () => import(/* webpackChunkName: "index" */ '../views/my/SysMessage')
const feedback = () => import(/* webpackChunkName: "index" */ '../views/my/Feedback')
const wallet = () => import(/* webpackChunkName: "index" */ '../views/my/Wallet')
const distribution = () => import(/* webpackChunkName: "index" */ '../views/my/Distribution')
const editUserPhone = () => import(/* webpackChunkName: "index" */ '../views/my/EditUserPhone')
const editUserInfo = () => import(/* webpackChunkName: "index" */ '../views/my/EditUserInfo')
const displayUserInfo = () => import(/* webpackChunkName: "index" */ '../views/my/DisplayUserInfo')
const WxConfig = () => import(/* webpackChunkName: "index" */ '../views/my/WxConfig')
const Public = () => import(/* webpackChunkName: "index" */ '../views/my/Public')
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
    path: '/my/my-wallet',
    component: wallet
  },
  {
    path: '/my/my-distribution',
    component: distribution
  },
  {
    path: '/my/Feedback',
    component: feedback
  },
  {
    path: '/my/EditUserInfo',
    component: editUserInfo
  },
  {
    path: '/my/EditUserPhone',
    component: editUserPhone
  },
  {
    path: '/my/DisplayUserInfo',
    component: displayUserInfo
  },
  {
    path: '/my/wx-config',
    component: WxConfig
  },
  {
    path: '/my/Public',
    component: Public
  }
]

export default PageInfo_From_My
