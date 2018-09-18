const { NODE_ENV } = process.env

let api = 'https://xcx.test.shbaoyuantech.com:30000'
if (NODE_ENV === 'development') {
  api = 'https://xcx.test.shbaoyuantech.com:30000'
}else if (NODE_ENV === 'production') {
  // api = 'https://xcx.shbaoyuantech.com'
}else{
  throw new Error('域名地址既不是测试环境也不是正式环境')
}
export default api
