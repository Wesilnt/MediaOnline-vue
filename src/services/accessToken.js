import { json2formData } from '../utils/utils'
import request from '../utils/request'
import { getCookie } from '../utils/userAuth'

export async function getToken() {
    const result = await request.post('/auth/wechat/get-wechat-auth-link', {
      originUrl: 'http://t.shbaoyuantech.com'
    })
      console.log(result)
    window.location.href = result.wechatAuthUrl
    return result
}
