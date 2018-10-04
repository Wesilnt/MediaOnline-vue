import request from '../utils/request'
import { IS_ONLINE } from '../utils/config'
import { originUrl } from './../utils/config'
export async function getToken() {
    const originHref=window.location.href.split('#')[1]
  const result = await request.post('/auth/wechat/get-wechat-auth-link', {
    originUrl:originUrl + originHref
  })
  if (IS_ONLINE) window.location.href = result.wechatAuthUrl
  return result
}
