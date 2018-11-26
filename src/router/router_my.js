const purchase = () => import(/* webpackChunkName: "index" */ '../views/my/Purchase')
const record = () => import(/* webpackChunkName: "index" */ '../views/my/Record')
const like = () => import(/* webpackChunkName: "index" */ '../views/my/Like')
const reply = () => import(/* webpackChunkName: "index" */ '../views/my/Reply')
const myPuzzle_Praise = () =>import(/* webpackChunkName: "index" */ '../views/my/MyPuzzle_Praise')
const sysMessage = () => import(/* webpackChunkName: "index" */ '../views/my/SysMessage')
const feedback = () => import(/* webpackChunkName: "index" */ '../views/my/Feedback')
const wallet = () => import(/* webpackChunkName: "index" */ '../views/my/Wallet')
const BookCoinRules = () => import(/* webpackChunkName: "index" */ '../views/my/BookCoinRules')
const distributionCenter = () => import(/* webpackChunkName: "index" */ '../views/my/DistributionCenter')
const distributorApply = () => import(/* webpackChunkName: "index" */ '../views/my/DistributorApply')
const DistributionApplyResult = () => import(/* webpackChunkName: "index" */ '../views/my/distribution/DistributionApplyResult')
const DistributionProfitDetail = () => import(/* webpackChunkName: "index" */ '../views/my/distribution/DistributionProfitDetail')
const DistributionGradeRule = () => import(/* webpackChunkName: "index" */ '../views/my/distribution/DistributionGradeRule')
const DistributionTransferDetail = () => import(/* webpackChunkName: "index" */ '../views/my/distribution/DistributionTransferDetail')
const editUserPhone = () => import(/* webpackChunkName: "index" */ '../views/my/EditUserPhone')
const editUserInfo = () => import(/* webpackChunkName: "index" */ '../views/my/EditUserInfo')
const displayUserInfo = () => import(/* webpackChunkName: "index" */ '../views/my/DisplayUserInfo')
const DistributorPoster = () => import(/* webpackChunkName: "index" */ '../components/share/DistributorPoster')
// const WxConfig = () => import(/* webpackChunkName: "index" */ '../views/my/WxConfig')
const Public = () => import(/* webpackChunkName: "index" */ '../views/my/Public')
const PageInfo_From_My = [
  {
    path: '/my/Purchase',
    name:'Purchase',
    component: purchase
  },
  {
    path: '/my/Record',
    name:'Record',
    component: record
  },
  {
    path: '/my/Like',
    name:'Like',
    component: like,
    props: true
  },
  {
    path: '/my/my-puzzle',
    name:'MyPuzzle',
    component: myPuzzle_Praise
  },
  {
    path: '/my/Reply',
    name:'Reply',
    component: reply
  },
  {
    path: '/my/my-praise',
    name:'MyPraise',
    component: myPuzzle_Praise,
      meta: { navHide: true }
  },
  {
    path: '/my/SysMessage',
    name:'sysMessage',
    component: sysMessage
  },
  {
    path: '/my/my-wallet',
    name:'Wallet',
    component: wallet
  },
  {
    path: '/my/my-distributionCenter',
    name:'DistributionCenter',
    component: distributionCenter
  },
  {
    path: '/my/my-distributorApply',
    name:'DistributorApply',
    component: distributorApply
  },
  {
    path: '/my/distribution/apply',
    name:'DistributionApplyResult',
    component: DistributionApplyResult
  },
  {
    path: '/my/distribution/profit',
    name:'DistributionProfitDetail',
    component: DistributionProfitDetail
  },
    {
    path: '/my/distribution/gradeRule',
    name:'DistributionGradeRule',
    component: DistributionGradeRule
  },
    {
    path: '/my/distribution/transfer',
    name:'DistributionTransferDetail',
    component: DistributionTransferDetail
  },
  {
    path: '/my/Feedback',
    name:'Feedback',
    component: feedback
  },
  {
    path: '/my/EditUserInfo',
    name:'editUserInfo',
    component: editUserInfo
  },
  {
    path: '/my/EditUserPhone',
    name:'editUserPhone',
    component: editUserPhone
  },
  {
    path: '/my/DisplayUserInfo',
    name:'displayUserInfo',
    component: displayUserInfo
  },
  // {
  //   path: '/my/wx-config',
  //   component: WxConfig
  // },
  {
    path: '/my/Public',
    name:'Public',
    component: Public
  },
  {
    path:'/my/wallet/rules',
    name:'BookCoinRules',
    component:BookCoinRules
  },
  {
     path: '/share/distribution/poster',
     name: 'DistributorPoster',
     component: DistributorPoster
  }
]

export default PageInfo_From_My
