// 编译环境
const { NODE_ENV } = process.env

// 调试选项，本地调试请改为 False
export const IS_ONLINE=true

// TODO router 设置未统一，后期需要统一格式
export  const courseType={
  '1007':'home/readings/book?id=',// 读书会
  '1005':'videoColumnDetail/',// 线上课程
  '1003':'home/visionDetail/',// 少年视野
  '1001':'home/freezone',// 免费专区
}
// 首页导航配置
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

// 后端接口api
let api = 'https://xcx.test.shbaoyuantech.com:30000'
if (NODE_ENV === 'development') {
  api = 'https://xcx.test.shbaoyuantech.com:30000'
} else if (NODE_ENV === 'production') {
  api = 'https://xcx.shbaoyuantech.com'
} else {
  throw new Error('域名地址既不是测试环境也不是正式环境')
}
export default api
