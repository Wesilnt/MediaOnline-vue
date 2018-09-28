import request from '../utils/request'
import { ISONLINE } from '../utils/config'

const { NODE_ENV } = process.env

let originUrl='http://t.shbaoyuantech.com/#';
 if (NODE_ENV === 'production') {
   originUrl='http://m.shbaoyuantech.com/#';
}

export async function getToken() {
    const originHref=window.location.href.split('#')[1]
  const result = await request.post('/auth/wechat/get-wechat-auth-link', {
    originUrl:originUrl + originHref
  })
  if (ISONLINE) window.location.href = result.wechatAuthUrl
  return result
}
