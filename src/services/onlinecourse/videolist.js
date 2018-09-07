//在线课程相关接口
import { stringify } from 'qs';
import request from '../../utils/request';

/** GET */
export async function getVideoList(params) {
    return request(`/index/getCourseSimpleBOList?${stringify(params)}`);
}

