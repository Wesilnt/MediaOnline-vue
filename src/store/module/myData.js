import { getNewMessageCount } from '../../api/myApi'
import store from './../store'
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
      console.log('replyMessageCount===',response)
      await commit('save',
        {
          replyMessageCount:response
        })
    },
    async getMyUserInfo({ dispatch, commit, state }) {
      const response = await store.dispatch('getUserInfo',true) 
      commit('saveUserInfo', response)
      return response
    }
  }
}
export default myData
