import { stringify } from 'qs'
import request from '../utils/request'

export async function getCoinNumber() {
    return request(`/distribution/getCoinNumByUser`)
}
export async function getCoinRecord(params) {
    return request(`/distribution/getCoinRecordPageByUser?${stringify(params)}`)
}