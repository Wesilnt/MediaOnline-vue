import { Toast } from 'vant'
import { WECHAT_SUBSCRIPTION_URL, courseType } from '../../utils/config'
import {
  getGroupBuyDetail, // 获取拼团详情
  startGroupBuy, //发起拼团
  joinGroupBuy, //参与拼团
  startCollectLike, // 发起集赞
  getCollectLike, // 领取集赞
  unlockCourse, // （单购）解锁课程
  wechatSubscribed // 判断用户是否关注公众号
} from '../../api/groupBuyApi.js'

export default {
  name: 'payment',
  namespaced: true,
  state: {},
  getters: {
    buyCount: (state, getters, { videoColumnDetailData }) => {
      console.log(videoColumnDetailData)
      return videoColumnDetailData.buyCount
    }
  },
  mutations: {
    saveState(state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    async getGroupBuyDetail({ commit, dispatch }, payload) {
      const result = await getGroupBuyDetail(payload)
      console.log(result)
    }
  }
}