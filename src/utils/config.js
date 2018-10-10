// 编译环境
const { NODE_ENV } = process.env

// 调试选项，本地调试请改为 False
export const IS_ONLINE = true
// 测试 Token
// export const TEST_TOKEN = "f9fa1791-2c9c-4723-8970-f59dfa1bd53d"

// TODO router 设置未统一，后期需要统一格式
export const courseType = {
  '1007': 'home/readings/book?id=', // 读书会
  '1005': 'videoColumnDetail/', // 线上课程
  '1003': 'home/visionDetail/', // 少年视野
  '1001': 'home/freezone' // 免费专区
}
// 首页导航配置
export const navbar = [
  {
    name: '首页',
    icon: require('../assets/images/nav_home_normal.png'),
    activeIcon: require('../assets/images/nav_home_selected.png'),
    path: '/home'
  },
  {
    name: '我的',
    icon: require('../assets/images/nav_info_normal.png'),
    activeIcon: require('../assets/images/nav_info_selected.png'),
    path: '/my'
  }
]

// 公众号 URL
export const WECHAT_SUBSCRIPTION_URL =
  'https://mp.weixin.qq.com/mp/profile_ext?action=home' +
  '&__biz=MzA4Mzg3NjE2Mg==&scene=126#wechat_redirect'

// 后端接口api
let api = 'https://xcx.test.shbaoyuantech.com:30000'
if (NODE_ENV === 'development') {
  api = 'https://xcx.test.shbaoyuantech.com:30000'
} else if (NODE_ENV === 'production') {
  api = 'https://xcx.shbaoyuantech.com'
} else {
  throw new Error('域名地址既不是测试环境也不是正式环境')
}

// 前端访问地址
// http://t.shbaoyuantech.com/#    测试环境
// http://m.shbaoyuantech.com/#    正式环境
let originUrl = 'http://t.shbaoyuantech.com/#'
if (NODE_ENV === 'production') {
  originUrl = 'http://m.shbaoyuantech.com/#'
}

// 微信授权地址
// 目前测试环境和正式环境地址一样
let wxConfigUrl =
  'http://tencent.test.shbaoyuantech.com/wechat-js-config/online'
if (NODE_ENV === 'development') {
  wxConfigUrl = 'http://tencent.test.shbaoyuantech.com/wechat-js-config/online'
}

export { api, originUrl, wxConfigUrl }
