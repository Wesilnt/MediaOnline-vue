import { getMyUserInfo, getNewMessageCount } from '../../api/myApi'
const myData = {
  namespaced: true,
  state: {
    replyMessageCount: 0,
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
      let response = await getNewMessageCount({ busiTypes: 3101 })
      console.log(response)
      await commit('save',
        {
          replyMessageCount:response
        })
    },
    async getMyUserInfo({ dispatch, commit, state }) {
      let response = await getMyUserInfo()
      // console.log(response)
      commit('saveUserInfo', response)
    }
  }
}
export default myData
