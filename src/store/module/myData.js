/** @format */

import { getNewMessageCount,isDistributor,applyDistributor } from '../../api/myApi'
import store from './../store'
import distributionData from '../module/distributionData'
const myData = {
  namespaced: true,
  state: {
    replyMessageCount: 0,
    userInfo: [],
    loading: false,
    isDistributor: null
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
    /**是否是分销员*/
    async checkDistributor({state, commit }, useCache = false) {
      if(undefined != state.isDistributor && useCache) return state.isDistributor
      const response = await isDistributor()
      await commit('save', {isDistributor: response.data})
      return response.data
    },
    async queryNewMessageCount({ dispatch, commit }) {
      const response = await getNewMessageCount({ busiTypes: 3101 })
      await commit('save', {
        replyMessageCount: response
      })
    },
    async getMyUserInfo({ dispatch, commit }) {
      const response = await store.dispatch('getUserInfo', true)
      commit('saveUserInfo', response)
      return response
    }
  },
  modules:{
    distributionData
  }
}
export default myData
