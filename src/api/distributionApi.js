import { stringify } from 'qs'
import request from '../utils/request'


export async function getDistributorInfo(params) {
    return request(`/distribution/distributorDetail?${stringify(params)}`)
}

export async function applyDistributor(params) {
    return request.post(`/distribution/applyForDistribution`, params)
}
export async function getDistributorIncomeList(params) {
    return request(`/distribution/getDisIncomeListByPage?${stringify(params)}`)
}

export async function getTransferRecords(params) {
    return request(`/distribution/getDisTransRecordListByPage?${stringify(params)}`)
}
