import { stringify } from 'qs'
import request from '../utils/request'
/*  *****我的**** */

//我喜欢的(我的收藏)
export async function getMyLike() {
  return request.post(`/favorite/getLessonListByFavorite?`,true)
}
//我喜欢的 删除
export async function postDelMyLike(params) {
  return request.post(`/favorite/unFavorite?${stringify(params)}`,true)
}
/* 我的拼团 */
export async function queryMyPuzzleList(params) {
  return request(`/user/myGroupBuyRecords?${stringify(params)}`)
}
/* 我的集赞 */
export async function queryMyPraise(params) {
  return request(`/user/myCollectLikeList?${stringify(params)}`)
}
//获取系统消息
export async function getMessage(params) {
  return request(`/user/getUserMsgListByBusiTypesAndRead?${stringify(params)}`)
}
//删除系统消息
export async function postDelMessage(params) {
  return request.post('/user/delUserMsg', params);
}
//意见反馈
export async function postFeedback(params) {
  return request.post('/feedback/feedbackContent', params)
}
