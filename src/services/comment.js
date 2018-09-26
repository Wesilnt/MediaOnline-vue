//留言相关接口
import { stringify } from 'qs'
import request from '../utils/request'

/** GET */
//获取留言列表
export async function getCommentList(params) {
  return request(`/comment/commentList?${stringify(params)}`)
}

//留言接口
export function postComment(params) {
  return request.post(`/comment/comment`, params)
}

// 语音留言接口
export async function voiceComment(params) {
  return request(`/comment/voiceComment?${stringify(params)}`)
}

//给留言点赞
export async function likeComment(params) {
  console.log(params)
  return request.post(`/comment/likeComment?${stringify(params)}`)
}
