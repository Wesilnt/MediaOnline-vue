const Praise = () => import(/* webpackChunkName: "index" */ '../views/praise/Praise')//集赞
const PraiseActive = () => import(/* webpackChunkName: "index" */ '../views/praise/PraiseActive') //集赞活动页面
const SharePoster = () => import(/* webpackChunkName: "index" */ '../components/share/SharePoster')//分享海报
export default [
  {
    path: '/Praise/:columnType/:courseId/:collectLikeId/detail',
    name: 'Praise',
    component: Praise
  },
  {
    path: '/praise/active/:courseId/:collectLikeId',
    name: 'PraiseActive',
    component: PraiseActive
  },
  {
    path: '/share/:postType/poster',
    name: 'SharePoster',
    component: SharePoster
  }
]
