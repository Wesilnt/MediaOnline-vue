const purchase = () => import(/* webpackChunkName: "my" */ '../views/my/Purchase')
const record = () => import(/* webpackChunkName: "my" */ '../views/my/Record')
const like = () => import(/* webpackChunkName: "my" */ '../views/my/Like')
const reply = () => import(/* webpackChunkName: "my" */ '../views/my/Reply')
const myPuzzle_Praise = () =>import(/* webpackChunkName: "my" */ '../views/my/MyPuzzle_Praise')
const sysMessage = () => import(/* webpackChunkName: "my" */ '../views/my/SysMessage')
const feedback = () => import(/* webpackChunkName: "my" */ '../views/my/Feedback')
const wallet = () => import(/* webpackChunkName: "my" */ '../views/my/Wallet')
const distribution = () => import(/* webpackChunkName: "my" */ '../views/my/Distribution')
const editUserPhone = () => import(/* webpackChunkName: "my" */ '../views/my/EditUserPhone')
const editUserInfo = () => import(/* webpackChunkName: "my" */ '../views/my/EditUserInfo')
const displayUserInfo = () => import(/* webpackChunkName: "my" */ '../views/my/DisplayUserInfo')
// const WxConfig = () => import(/* webpackChunkName: "my" */ '../views/my/WxConfig')
const Public = () => import(/* webpackChunkName: "my" */ '../views/my/Public')
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
  // {
  //   path: '/my/wx-config',
  //   component: WxConfig
  // },
  {
    path: '/my/Public',
    component: Public
  }
]

export default PageInfo_From_My
