// 编译环境
const { NODE_ENV } = process.env

// 调试选项，本地调试请改为 False
export const IS_ONLINE = false
// 测试 Token
export const TEST_TOKEN = "47f9facc-0504-4c4c-9d59-12208b6cd577"

// TODO router 设置未统一，后期需要统一格式
export const courseType = {
    '1007': 'detail/reading/', // 读书会
    '1005': 'detail/onlineCourse/', // 线上课程
    '1003': 'detail/onlineVision/', // 少年视野
    '1001': 'detail/freezone/' // 免费专区
}

export const columnType = {
    'reading': {name:'reading',code:1007},             // 读书会
    'onlineCourse': {name:'onlineCourse',code:1005},   // 线上课程
    'onlineVision': {name:'onlineVision',code:1003},   // 少年视野
    'freezone': {name:'freezone',code:1001}            // 免费专区
}

export const getColumnType = code => Object.keys(columnType).find(key=>  columnType[key].code == parseInt(code)) 

export const columnStatus = {
    'reading':'1007', // 读书会
    'onlineCourse':'1005', // 线上课程
    'onlineVision':'1003', // 少年视野
    'freezone':'1001' // 免费专区
}

export const homeColumnList = {
  // 'freezone': {componentName:'FreeList', title:'免费专区',listKey:'freeList',link:"/home/freezone"},// 免费专区
  // 少年视野
  'onlineVision': {code: 1003, componentName:'VisionCell', title:'音频课程',listKey:'visionList',link:`/home/${columnType['onlineVision'].name}/columnlist`},
  // 线上课程
  'onlineCourse': {code: 1005, componentName:'VideoCell', title:'视频课程',listKey:'videoList',link:`/home/${columnType['onlineCourse'].name}/columnlist`}, 
  // 读书会
  'reading': {code: 1007, componentName:'BookCell', title:'少年读书会',listKey:'bookList',link:`/home/${columnType['reading'].name}/columnlist`}, 
}
// 首页导航配置
export const navbar = [
    {
        name: '发现',
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
import router from '../router/router'
// 单集详情跳转： 视频详情
export const openVideoDetail = (context,{columnType,courseId,lessonId})=>{
  router.push({ name: 'videoCourseDetail', params:{ courseId , columnType ,lessonId} })
}
// 单集详情跳转： 音频详情
export const openAudioDetail = (context,{columnType,courseId,lessonId,courseName})=>{
  router.push({ name: 'AudioPlay', params: {courseId ,columnType ,lessonId},query:{courseName} })
}

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

export const puzzleTabs = {
    all: '全部',
    waiting: '中',
    succeed: '成功',
    fail: '失败'
}
export const puzzleTypes = {
    all: '1200',
    waiting: '1202',
    succeed: '1203',
    fail: '1204'
}
export const praiseTypes = {
    all: '1200',
    waiting: '1202',
    succeed: '1203,1205',
    fail: '1204'
}
export const purchaseSortType = {
    lastBought: '最新购买',
    lastLearn: '最近学习'
}
export const purchaseQueryType={
    '1007': '读书会',
    '1005': '线上课程',
    '1003': '少年视野',
}
