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
    isDistributor:false
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
    async isDistributor({ commit }) {
      const response = await isDistributor()
      await commit('save', {isDistributor: response})
    },
    /**申请成为分销员*/
    async applyDistributor({ state, commit,dispatch }, params) {
          const res = await applyDistributor(params)
          await commit('save', {isDistributor: res})
          return res
      },
    async queryNewMessageCount({ dispatch, commit }) {
      const response = await getNewMessageCount({ busiTypes: 3101 })
      console.log('replyMessageCount===', response)
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
  module:{
    distributionData
  }
}
export default myData
