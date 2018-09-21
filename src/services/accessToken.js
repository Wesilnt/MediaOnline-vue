import { json2formData } from '../utils/utils';
import request from '../utils/request';

export async function getToken() {
    if (getCookie('COOKIE_TOKEN_KEY_CNONLINE') != null) {
        // todo 缓存
        let expireTime = getCookie('COOKIE_TOKEN_KEY_EXPIRE_TIME')
        let timestamp = new Date().getTime()
        if (expireTime < timestamp) {
            // const bodyData = json2formData({ 'originUrl': 'http://t.shbaoyuantech.com/' })
            // let result = await request('/auth/wechat/get-wechat-auth-link', { method: 'POST', body: bodyData }, false)
            // window.location.href = result.wechatAuthUrl;
        }
    } else {
        const bodyData = json2formData({ originUrl: 'http://t.shbaoyuantech.com/' })
        let result = await request(
            '/auth/wechat/get-wechat-auth-link',
            { method: 'POST', body: bodyData },
            false
        )
        window.location.href = result.wechatAuthUrl
    }
}