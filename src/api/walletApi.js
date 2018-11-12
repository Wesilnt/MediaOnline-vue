import { stringify } from 'qs'
import request from '../utils/request'

export async function getCoinNumber(params) {
    return request(`/distribution/getCoinNumByUser?${stringify(params)}`)
}
export async function getCoinRecord(params) {
    return request(`/distribution/getCoinRecordPageByUser?${stringify(params)}`)
}