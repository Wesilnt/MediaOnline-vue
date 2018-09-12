import {stringify} from 'qs'
import request from '../utils/request'


export function getFreezoneList(params) {
  return request(`/index/getFreeLessonList?${stringify(params)}`)
}
 