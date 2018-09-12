import {stringify} from 'qs'
import request from '../utils/request'


export function getCommentList(params) {
  return request(`/comment/commentList?${stringify(params)}`)
}

export function postComment(params) {
  return request.post(`/comment/comment`,params)
}