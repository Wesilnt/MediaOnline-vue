import request from '../utils/request'

export async function getToken() {
  const result = await request.post('/auth/wechat/get-wechat-auth-link', {
    originUrl: 'http://t.shbaoyuantech.com'
  })
  // window.location.href = result.wechatAuthUrl
  return result
}
