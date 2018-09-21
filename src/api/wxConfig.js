const { NODE_ENV } = process.env

let wxConfig = 'http://tencent.shbaoyuantech.com/wechat-js-config/xcx'
if (NODE_ENV === 'development') {
  wxConfig = 'http://tencent.test.shbaoyuantech.com/wechat-js-config/xcx'
}

export default wxConfig
