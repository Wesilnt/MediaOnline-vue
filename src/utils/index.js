/**
 * 查看地图
 * @param  {Object} point 坐标
 * @return {[type]}       [description]
 */
export const checkMap = point => {
  wx.openLocation({
    latitude: Number(point.latitude), // 纬度，浮点数，范围为90 ~ -90
    longitude: Number(point.longitude), // 经度，浮点数，范围为180 ~ -180。
    name: point.name || '', // 位置名
    address: point.address || '' // 地址详情说明
    // scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
    // infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
  })
}

/**
 * 设置cookie
 * @param name {string} cookie name
 * @param value {string} cookie value
 * @param seconds cookie 过期时间 时间戳
 */
export const setCookie = (name, value, seconds = 0) => {
  let expires = '',
    date
  if (seconds !== 0) {
    //设置cookie生存时间
    date = new Date()
    date.setTime(date.getTime() + seconds * 1000)
    expires = '; expires=' + date.toGMTString()
  }
  document.cookie = name + '=' + escape(value) + expires + '; path=/' //转码并赋值
}

/**
 * 获取cookie
 * @param name {string} cookie name
 * @returns {string} cookie value
 */
export const getCookie = name => {
  let nameEQ = name + '='
  let ca = document.cookie.split(';') //把cookie分割成组

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      //判断一下字符串有没有前导空格
      c = c.substring(1, c.length) //有的话，从第二位开始取
    }
    if (c.indexOf(nameEQ) == 0) {
      //如果含有我们要的name
      return unescape(c.substring(nameEQ.length, c.length)) //解码并截取我们要值
    }
  }
  return null
}

/**
 * 清除cookie
 * @param name {string} cookie name
 */
export const clearCookie = name => {
  setCookie(name, '', -1)
}

/**
 * 获取Parame value
 * @param name {string} parame name
 * @returns {Array|{index: number, input: string}|string}
 */
export const getParameterByName = name => {
  const match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

/**
 * localStorage setItem
 * @param name {string} storage name
 * @param value {string} storage value
 */
export const addItem = (name, value) => {
  const v = JSON.stringify(value)

  localStorage.setItem(name, v)
}

/**
 * localStorage getItem
 * @param name {string} storage name
 * @returns {string|null} storage value
 */
export const getItem = name => {
  const v = localStorage.getItem(name)

  return v == undefined ? null : JSON.parse(v)
}

/**
 * localStorage removeItem
 * @param name {string} storage name
 */
export const removeItem = name => {
  localStorage.removeItem(name)
}

/** 格式化时间戳 yyyy/mm/dd hh:mm */
export const formatDate = time => {
  const date = new Date(time * 1000)
  const seperator1 = '/'
  const seperator2 = ':'
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  let ss = date.getMinutes()

  if (month >= 1 && month <= 9) {
    month = '0' + month
  }

  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (ss >= 0 && ss <= 9) {
    ss = '0' + ss
  }

  return (
    date.getFullYear() +
    seperator1 +
    '  ' +
    month +
    seperator1 +
    '  ' +
    strDate +
    ' ' +
    date.getHours() +
    seperator2 +
    ss
  )
}

/**
 * 下拉格式转换 id=>value, name=>label
 * @param  {Array}  arr [description]
 * @return {[type]}     [description]
 */
export const converFormat = options => {
  const isArray = Array.isArray(options)
  const isObject = getClass(options, 'Object')

  if (!isArray || !isObject) return options

  let baseOpts = {
    arr: isArray ? options : [],
    labelName: 'name',
    valueName: 'id'
  }

  if (isObject) baseOpts = Object.assign(baseOpts, options)

  const { arr, labelName, valueName } = baseOpts

  return arr.map(({ [labelName]: value, [valueName]: label }) => ({
    value,
    label
  }))
}

const fmtWeek = day => {
  const daysfmt = '日一二三四五六'
  return daysfmt[day]
}

/**
 * @param lessonDate  2018-01-01
 * @param weekName  周|星期
 * @returns {string}  e.g => 3月1日 周一
 */
export const getLessonDate = (lessonDate, weekName = '周') => {
  if (!lessonDate) return ''

  const date = new Date(lessonDate)
  const momth = date.getMonth() + 1 + '月'
  const day = date.getDate() + '日 '
  const week = weekName + fmtWeek(date.getDay()) + ' '

  return {
    default: momth + day + week,
    week
  }
}

export const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(
  window.navigator.userAgent
)

export const weeks = [
  { label: '全部时间', value: '', selected: true },
  { label: '星期一', value: 1 },
  { label: '星期二', value: 2 },
  { label: '星期三', value: 3 },
  { label: '星期四', value: 4 },
  { label: '星期五', value: 5 },
  { label: '星期六', value: 6 },
  { label: '星期日', value: 7 }
]

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getClass = (source, type) => {
  return (
    Object.prototype.toString.call(source).match(/^\[object\s(.*)\]$/)[1] ===
    type
  )
}

export const isPc = () => {
  const Agents = [
    'android',
    'iphone',
    'symbianos',
    'windows phone',
    'ipad',
    'ipod'
  ]
  const userAgentInfo = navigator.userAgent.toLowerCase()

  for (let agent of Agents) {
    if (userAgentInfo.includes(agent)) return false
  }
  return true
}
