import { getMyUserInfo, getNewMessageCount } from '../../api/myApi'
const myData = {
  namespaced: true,
  state: {
    newReplyMessageCount: 0,
    newSysMessageCount: 0,
    userInfo: [],
    loading: false
  },
  mutations: {
    save(state, payload) {
      Object.assign(state, payload)
    },
    saveUserInfo(state, payload) {
      // console.log(payload)
      state.userInfo = payload
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    }
  },
  actions: {
    async queryNewMessageCount({ dispatch, commit, state }) {
      let replyResult = await getNewMessageCount({ busiTypes: 3101 })
      if (replyResult) {
        commit('save', replyResult.data)
      }

      let sysResult = await getNewMessageCount({ busiTypes: 3103 })
      if (sysResult) {
        commit('save', sysResult.data)
      }
    },
    async getMyUserInfo({ dispatch, commit, state }) {
      let response = await getMyUserInfo()
      // console.log(response)
      commit('saveUserInfo', response)
    }
  }
}
export default myData
