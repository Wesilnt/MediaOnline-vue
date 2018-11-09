const Praise = () => import(/* webpackChunkName: "index" */ '../views/praise/Praise')//集赞
const PraiseActive = () => import(/* webpackChunkName: "index" */ '../views/praise/PraiseActive') //集赞活动页面
const SharePoster = () => import(/* webpackChunkName: "index" */ '../components/share/SharePoster')//分享海报
export default [
  {
    path: '/praise/:columnType/:courseId/:collectLikeId/detail',
    name: 'Praise',
    component: Praise
  },
  {
    path: '/praise/:columnType/:courseId/:collectLikeId/active',
    name: 'PraiseActive',
    component: PraiseActive
  },
  {
    path: '/share/:columnType/:courseId/:postType/poster',
    name: 'SharePoster',
    component: SharePoster
  }
]
