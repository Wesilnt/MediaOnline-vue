export const ISONLINE=true
//TODO router 设置未统一，后期需要统一格式
export  const courseType={
  '1007':'home/readings/book?id=',// 读书会
  '1005':'videoColumnDetail/',// 线上课程
  '1003':'home/visionDetail/',// 少年视野
  '1001':'home/freezone',// 免费专区
}
export const navbar = [
  {
    name: '首页',
    icon: require('../assets/nav_home_normal.png'),
    activeIcon: require('../assets/nav_home_selected.png'),
    path: '/home'
  },
  {
    name: '我的',
    icon: require('../assets/nav_info_normal.png'),
    activeIcon: require('../assets/nav_info_selected.png'),
    path: '/my'
  }
]
