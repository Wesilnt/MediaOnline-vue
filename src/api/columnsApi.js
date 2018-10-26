//在线课程相关接口
import { stringify } from 'qs'
import request from '../utils/request'

/** GET */
//获取专栏列表
// export async function getColumns(params) {
//     return request(`/index/getCourseSimpleBOList?${stringify(params)}`);
// }
export async function getColumns(params) {
  return request(`/course/courseSimpleList?${stringify(params)}`)
}

// 获取视频专栏信息
export async function getVideoColumnDetail(params) {
  return request(`/course/detail?${stringify(params)}`)
}
// 获取视频课程详情
export async function getVideoLessonDetail(params) {
  return request(`/lesson/lessonDetail?${stringify(params)}`)
}
// 专栏下的课节列表
export async function getLessonListByCourse(params) {
  return request(`/lesson/getLessonListByCourse?${stringify(params)}`)
}
//收藏接口
export async function doFavorite(params) {
  return request.post('/favorite/doFavorite', params)
}
//取消收藏接口
export async function unFavorite(params) {
  return request.post('/favorite/unFavorite', params)
}
//提交视频课节收听进度
export async function lessonListenForVedio(params) {
  return request.post('/lesson/lessonListenForVedio', params)
}
//提交视频课节收听进度
export async function uploadAnswer(params) {
  return request.post('/lesson/doAnswer', params)
}

//少年视野获取专栏分类列表
export function getVisionCourseList(params){
  return request(`/lesson/getCategoryListByCourse?${stringify(params)}`)
}