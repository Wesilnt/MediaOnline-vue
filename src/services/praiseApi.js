import {stringify} from 'qs'
import request from '../utils/request'

export function checkStatus(params) {
  return request(`/collectLike/checkStatus?${stringify(params)}`)
}
export function getCollectDetail(params) {
  return request(`/collectLike/detail?${stringify(params)}`)
}
export function getCollectLike(params) { 
  return request.post(`/collectLike/getCollectLike`,params)
}
export function getPoster(params) {
  return request(`/collectLike/getPoster?${stringify(params)}`)
}
export function startCollectLike(params) { 
  return request.post(`/collectLike/startCollectLike`,params)
}
export function joinCollectLike(params) { 
  return request.post(`/collectLike/joinCollectLike`,params)
}  
export function getUserByToken(params) { 
  return request(`/user/getUserByToken${stringify(params)}`)
}

