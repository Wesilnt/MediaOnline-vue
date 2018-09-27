import request from '../utils/request'
import { ISONLINE } from '../utils/config'

export async function getToken() {
  console.log(window.location.href)
  const result = await request.post('/auth/wechat/get-wechat-auth-link', {
    originUrl: window.location.href
  })
  console.log(result)
  if (ISONLINE) window.location.href = result.wechatAuthUrl
  return result
}
