import { stringify } from 'qs'
import request from '../utils/request'

export function postComment(params) {
  return request.post(`/comment/comment`, params)
}

//给留言点赞
export async function likeComment(params) {
  return request.post(`/comment/likeComment?${stringify(params)}`)
}

/** GET */
//获取留言列表
export async function getCommentList(params) {
    return request(`/comment/commentList?${stringify(params)}`)
}

// 语音留言接口
export async function voiceComment(params) {
    return request(`/comment/voiceComment?${stringify(params)}`)
}
