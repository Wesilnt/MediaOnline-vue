//在线课程相关接口
import { stringify } from 'qs';
import request from '../utils/request';

/** GET */
//获取专栏列表
export async function getColumns(params) {
    return request(`/index/getCourseSimpleBOList?${stringify(params)}`);
}
