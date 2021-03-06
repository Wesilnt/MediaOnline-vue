import { stringify } from 'qs'
import request from '../utils/request'
import { wxConfigUrl } from './../utils/config'
//拼团详情
export async function getGroupBuyDetail(params) {
  return request(`/groupBuy/detail?${stringify(params)}`)
}

//发起拼团
export function startGroupBuy(params) {
  return request.post(`/groupBuy/startGroupBuy`, params)
}

//参与拼团
export function joinGroupBuy(params) {
  return request.post(`/groupBuy/joinGroupBuy`, params)
}

//发起集赞
export function startCollectLike(params) {
  return request.post(`/collectLike/startCollectLike`, params)
}

//领取集赞
export function getCollectLike(params) {
  return request.post(`/collectLike/getCollectLike`, params)
}

//解锁课程
export function unlockCourse(params) {
  return request.post(`/user/unlockCourse`, params)
}

//判断用户是否关注公众号
export async function wechatSubscribed() {
  return request(`/auth/wechat/subscribed`)
}

//微信JDK授权
export function wxConfig(params) {
  return request(
    wxConfigUrl + `?${stringify(
      params
    )}`
  )
}
