import { stringify } from 'qs';
import request from '../utils/request';
/*  *****我的**** */

/* 我的拼团 */
export async function queryMyPuzzleList(params) {
  return request.post('/user/myGroupBuyRecords', params,false);
}
/* 我的集赞 */
export async function queryMyPraise(params) {
  return request.post('/user/myCollectLikeList', params,false);
}

//意见反馈
export async function postFeedback(params) {
  return request.post('/feedback/feedbackContent', params);
}
