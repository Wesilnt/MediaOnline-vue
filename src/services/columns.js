//在线课程相关接口
import { stringify } from 'qs';
import request from '../utils/request';

/** GET */
//获取专栏列表
// export async function getColumns(params) {
//     return request(`/index/getCourseSimpleBOList?${stringify(params)}`);
// }
export async function getColumns(params) {
  return request(`/course/courseSimpleList?${stringify(params)}`);
}

// 获取视频专栏信息
export async function getVideoColumnDetail(params) {
  return request(`/course/detail?${stringify(params)}`)
}

// 获取视频课程详情
export async function getVideoLessonDetail(params) {
  return request(`/lesson/lessonDetail?${stringify(params)}`)
}