import { stringify } from 'qs'
import request from '../utils/request'

export async function getFreezoneList(params) {
  return request(`/lesson/getLessonListByCourse?${stringify(params)}`)
}
export async function postLearnRate(params) {
  return request.post(`/lesson/lessonListenRs`, params)
}
export async function doFreeLesson(params) {
  return request.post(`/lesson/doFreeLesson`, params)
} 
export async function getUserByToken() { 
  return request('user/getUserByToken')
}
