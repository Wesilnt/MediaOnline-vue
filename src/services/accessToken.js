import request from '../utils/request'

export async function getToken() {
    console.log(window.location.href);
    const result = await request.post('/auth/wechat/get-wechat-auth-link', {
    originUrl: window.location.href
  })
    console.log(result);
    // window.location.href = result.wechatAuthUrl
  return result
}
