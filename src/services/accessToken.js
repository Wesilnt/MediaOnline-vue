import { json2formData } from '../utils/utils'
import request from '../utils/request'
import { getCookie } from '../utils/userAuth'

export async function getToken() {
  if (getCookie('COOKIE_TOKEN_KEY_CNONLINE') != null) {
    // todo 缓存
    const expireTime = getCookie('COOKIE_TOKEN_KEY_EXPIRE_TIME')
    const timestamp = new Date().getTime()
    if (expireTime < timestamp) {
      // const bodyData = json2formData({ 'originUrl': 'http://t.shbaoyuantech.com/' })
      // let result = await request('/auth/wechat/get-wechat-auth-link', { method: 'POST', body: bodyData }, false)
      // window.location.href = result.wechatAuthUrl;
    }
  } else {
    const result = await request.post('/auth/wechat/get-wechat-auth-link', {
      originUrl: 'http://t.shbaoyuantech.com'
    })
      console.log(result)
    window.location.href = result.wechatAuthUrl
    return result
  }
}
