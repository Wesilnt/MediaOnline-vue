import { stringify } from 'qs'
import request from '../utils/request'
/*  *****我的**** */
//我的已购课程
export async function getMyPurchase(params) {
  return request(`/user/myCourseList?${stringify(params)}`)
}
//我的播放记录
export async function getPlayRecord(params) {
  return request(`/lesson/myLessonPlayRecord?${stringify(params)}`)
}
//删除播放记录
export async function postDelPlayRecord(params) {
  return request.post('/lesson/delUserLesson', params)
}
//批量删除播放记录
export async function postBatchDellayRecord(params) {
  return request.post('/lesson/batchDelUserLesson', params)
}
//我喜欢的(我的收藏)
export async function getMyLike() {
  return request.post(`/favorite/getLessonListByFavorite?`, true)
}
//我喜欢的 删除
export async function postDelMyLike(params) {
  return request.post('/favorite/unFavorite', params)
}
//我喜欢的 删除
export async function postBatchDelMyLike(params) {
  return request.post('/favorite/batchUnFavorite', params)
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
//获取已读消息
export async function getUsedMessage(params) {
  return request(`/user/getUserMsgListByBusiTypesOfReaded?${stringify(params)}`)
}
//删除消息
export async function postDelMessage(params) {
  return request.post('/user/delUserMsg', params)
}
//批量删除消息
export async function postBatchDelMessage(params) {
  return request.post('/user/batchDelUserMsg', params)
}
//意见反馈
export async function postFeedback(params) {
  return request.post('/feedback/feedbackContent', params)
}
//获取用户信息
export async function getMyUserInfo() {
  return request(`/user/getUserByToken`)
}
//修改用户信息
export async function postUserInfo(params) {
  return request.post('/user/updateUserInfo', params, true)
}
//获取用户通知
export function getNewMessageCount(params) {
  return request(`/user/getUserMsgCountByBusiTypes?${stringify(params)}`)
}
