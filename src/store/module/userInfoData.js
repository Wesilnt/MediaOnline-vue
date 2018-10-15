import { getMyUserInfo } from '../../api/myApi'
import { postUserInfo } from '../../api/myApi'
import store from "../store";
const userInfoData = {
  namespaced: true,
  state: {
    userInfo: [],
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
      const response = await store.dispatch('getUserInfo')
      // console.log(response)
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
      await postUserInfo({ role: role, gender:gender, grade:grade})
      commit('toggleLoading', {
        loading: false
      })
    },
    async updateUserInfoGender({ dispatch, commit, state }, { gender }) {
      //更新性别
      const response = await postUserInfo({ gender:gender })
      if (!response)return
      commit('updateGender', {
        gender: gender
      })

    },
    async updateUserInfoGrade({ dispatch, commit, state }, { grade }) {
      //更新年级
      console.log("grade" + grade)
      const response = await postUserInfo({ grade: grade })
      if (!response) return
      commit('updateGrade', {
        grade: grade
      })
    }
  }
}
export default userInfoData
