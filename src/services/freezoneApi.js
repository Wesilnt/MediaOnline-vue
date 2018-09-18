import {stringify} from 'qs'
import request from '../utils/request'


export function getFreezoneList(params) {
  return request(`/lesson/getLessonListByCourse?${stringify(params)}`)
}
export function postLearnRate(params) { 
  return request.post(`/lesson/lessonListenRs`,params)
}
export function doFreeLesson(params) { 
  return request.post(`/lesson/doFreeLesson`,params)
}
export function getUserByToken(params) { 
  return request(`/user/getUserByToken${stringify(params)}`)
}
