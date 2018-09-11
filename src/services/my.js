import { stringify } from 'qs'
import request from '../utils/request'
/*  *****我的**** */

/* 我的拼团 */
export async function queryMyPuzzleList(params) {
  return request(`/user/myGroupBuyRecords?${stringify(params)}`)
}
/* 我的集赞 */
export async function queryMyPraise(params) {
  return request(`/user/myCollectLikeList?${stringify(params)}`)
}
//获取系统消息
export async function getSysMessage(params) {
  return request(`/user/getUserMsgListByBusiTypesAndRead?${stringify(params)}`)
}
//删除系统消息
export async function postDelSysMessage(params) {
  return request.post('/user/delUserMsg', params);
}
//意见反馈
export async function postFeedback(params) {
  return request.post('/feedback/feedbackContent', params)
}
