import { stringify } from 'qs'
import request from '../utils/request'
export function sendMobileCode(params) {
  return request.post(`/user/sendMobileCode`, params)
}
export function validateMobileCode(params) {
  return request.post(`/user/validateMobileCode`, params)
}
