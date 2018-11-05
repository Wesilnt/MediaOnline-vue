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
  namespaced: true,
  name: 'payment',
  state: () => ({
    masterId: '',
    starterUid: '',
    userList: [],
    userAccessStatusFromGroup: 0,
    createTime: null,
    alreadyCount: 0,
    status: 0
  }),
  mutations: {
    saveState(state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    async getGroupBuyDetail({ commit }, payload) {
      const response = await getGroupBuyDetail(payload)
      Object.entries(response).map(item => {
        // console.log(`%c ${item}`, 'color: #009688')
        console.log(item)
      })
      const {
        userId: masterId,
        starterUid,
        userList,
        userAccessStatusFromGroup,
        createTime,
        alreadyCount,
        status
      } = response
      commit('saveState', {
        masterId,
        starterUid,
        userList,
        userAccessStatusFromGroup,
        createTime,
        alreadyCount,
        status
      })
    }
  }
}
