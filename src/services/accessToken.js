import request from '../utils/request'
import { ISONLINE } from '../utils/config'

export async function getToken() {
  console.log(window.location.href)
    const originHref=window.location.href.split('#')[1]
    // debugger
  const result = await request.post('/auth/wechat/get-wechat-auth-link', {
    originUrl:'http://t.shbaoyuantech.com/#' +originHref
  })
  if (ISONLINE) window.location.href = result.wechatAuthUrl
  return result
}
