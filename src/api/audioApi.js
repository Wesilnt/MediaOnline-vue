import { stringify } from 'qs'
import request from '../utils/request'

export function getAudioDetail(params) {
  return request(`/lesson/lessonDetail?${stringify(params)}`)
}

export function postFavorite(params) {
  return request.post(`/favorite/doFavorite?${stringify(params)}`)
}

export function postUnFavorite(params) {
  return request.post(`/favorite/unFavorite?${stringify(params)}`)
}

export function getAudioDesc(params) {
  return request(`/lesson/lessonDescDetail?${stringify(params)}`)
}

export function getSingleSetList(params) {
  return request(`/lesson/getLessonListByCourse?${stringify(params)}`)
}

export function postLearnRate(params) {
  return request.post(`/lesson/lessonListenRs`, params)
}
