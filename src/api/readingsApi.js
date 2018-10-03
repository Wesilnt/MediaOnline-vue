import request from '../utils/request'
import { stringify } from 'qs'

export function getReadingsList(params) {
  return request(`/course/courseSimpleList?${stringify(params)}`)
}
export function getBookDetail(params) {
  return request(`/course/detail?${stringify(params)}`)
}
export function getSingleSetList(params) {
  return request(`/lesson/getLessonListByCourse?${stringify(params)}`)
}
