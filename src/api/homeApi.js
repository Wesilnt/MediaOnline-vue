import { stringify } from 'qs'
import request from '../utils/request'

function getList(params) {
  return request(`/index/getCourseIndexBOList?${stringify(params)}`)
}

export function getFreeList(params) {
  return request(`/index/getFreeLessonList?${stringify(params)}`)
}
export function getNewMessageCount() {
  return request(`/user/getUserMsgCountAndNewestReplyFromAvatarUrl`)
}
export function getVisionList() {
  return getList({ type: 1003, pageSize: 3 })
}
export function getVideoList() {
  return getList({ type: 1005, pageSize: 3 })
}
export function getBookList() {
  return getList({ type: 1007, pageSize: 9 })
}

export async function getBannerList(params) {
  return request(`/index/bannerList?${stringify(params)}`)
}
