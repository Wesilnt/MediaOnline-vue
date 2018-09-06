const { NODE_ENV } = process.env

let wxConfig = 'http://tencent.shbaoyuantech.com/wechat-js-config/newguowen'
if (NODE_ENV === 'development') {
  wxConfig = 'http://tencent.test.shbaoyuantech.com/wechat-js-config/testmp'
}

export default wxConfig
