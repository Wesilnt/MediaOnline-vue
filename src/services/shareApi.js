import {stringify} from 'qs'
import request from "../utils/request"

export function getPosterInfo(params){
   return request(`/lesson/getPoster?${stringify(params)}`)
}