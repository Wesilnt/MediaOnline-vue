import { stringify } from 'qs'
import request from '../utils/request'

export async function postLearnRate(params) {
    return request.post(`/lesson/lessonListenRs`, params)
}