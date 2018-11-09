import { getMyUserInfo } from '../../api/myApi'
import { postUserInfo } from '../../api/myApi'
import store from "../store";
const userInfoData = {
  namespaced: true,
  state: {
    userInfo: {},
    loading: false
  },
  mutations: {
    saveUserInfo(state, payload) {
      Object.assign(state, payload)
    },
    updateGrade(state,payload) {
      Object.assign(state.userInfo,payload)
    },
    updateGender(state,payload) {
      Object.assign(state.userInfo,payload)
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    }
  },
  actions: {
    async getMyUserInfo({ dispatch, commit, state }) {
      const response =  await store.dispatch('getUserInfo',true)
      await commit({
        type: 'saveUserInfo',
        userInfo: response
      }) 
    },
    async updateUserInfo({ dispatch, commit, state }, { role, gender, grade }) {
      //更新用户信息
      await commit('toggleLoading', {
        loading: true
      })
      const res = await postUserInfo({ role: role, gender:gender, grade:grade})
      commit('toggleLoading', {loading: false})
      // 更新本地用户信息
      await store.dispatch('getUserInfo',true)
      return res
    },
    async updateUserInfoGender({ dispatch, commit, state }, { gender }) {
      //更新性别
      const response = await postUserInfo({ gender:gender })
        console.log("更新用户性别：", response)
      if (!response)return
      commit('updateGender', {gender: gender})
      // 更新本地用户信息
      await store.dispatch('getUserInfo',true)
    },
    async updateUserInfoGrade({ dispatch, commit, state }, { grade }) {
      //更新年级
      console.log("grade" + grade)
      const response = await postUserInfo({ grade: grade })
      if (!response) return
      commit('updateGrade', {grade: grade})
      // 更新本地用户信息
      await store.dispatch('getUserInfo',true)
    }
  }
}
export default userInfoData
