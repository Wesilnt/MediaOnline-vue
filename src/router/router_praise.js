import Praise from '../views/praise/Praise.vue' //集赞
import PraiseActive from '../views/praise/PraiseActive.vue' //集赞活动页面
export default [
  {
    path: '/Praise/:courseId/:collectLikeId',
    name: 'Praise',
    component: Praise
  },
  {
    path: '/praise/active/:courseId/:collectLikeId',
    name: 'PraiseActive',
    component: PraiseActive
  }
]
