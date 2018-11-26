const Praise = () => import(/* webpackChunkName: "index" */ '../views/praise/Praise')//集赞
const PraiseActive = () => import(/* webpackChunkName: "index" */ '../views/praise/PraiseActive') //集赞活动页面
const SharePoster = () => import(/* webpackChunkName: "index" */ '../components/share/SharePoster')//分享海报
export default [
  {
    path: '/praise/:columnType/:courseId/:collectLikeId/detail',
    name: 'Praise',
    component: Praise,
      meta: { navHide: true }
  },
  {
    path: '/praise/:columnType/:courseId/:collectLikeId/active',
    name: 'PraiseActive',
    component: PraiseActive,
      meta: { navHide: true }
  },
  {
    path: '/share/:columnType/:courseId/:postType/poster',
    name: 'SharePoster',
    component: SharePoster,
      meta: { navHide: true }
  }
]
