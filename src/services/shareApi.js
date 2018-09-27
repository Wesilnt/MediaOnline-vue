import { stringify } from 'qs'
import request from '../utils/request'

export function getPosterInfo(params) {
  return request(`/lesson/getPoster?${stringify(params)}`)
}

export function getUserInfo(params) {
  return request(`/user/getUserByToken?${stringify(params)}`)
}
export function getPosterforPraise(params) {
  return request(`/collectLike/getPoster?${stringify(params)}`)
}
