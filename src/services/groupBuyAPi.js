import {stringify} from 'qs'
import request from '../utils/request'

//拼团详情
export async function getGroupBuyDetail(params) {
    return request(`/groupBuy/detail?${stringify(params)}`);
  }
  
//发起拼团
export function startGroupBuy(params) {
    return request.post(`/groupBuy/startGroupBuy`,params)
}

//参与拼团
export function joinGroupBuy(params) {
    return request.post(`/groupBuy/joinGroupBuy`,params)
}

//发起集赞
export function startCollectLike(params) {
    return request.post(`/collectLike/startCollectLike`,params)
}

//领取集赞
export function getCollectLike(params) {
    return request.post(`/collectLike/getCollectLike`,params)
}

export function wxConfig(params) {
    return request(`http://tencent.test.shbaoyuantech.com/wechat-js-config/xcx?${stringify(params)}`)
}