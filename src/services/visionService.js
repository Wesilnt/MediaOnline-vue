import { stringify } from 'qs'
import request from '../utils/request'

export function getVisionList(params){
    return request(`/course/courseSimpleList?${stringify(params)}`)
}