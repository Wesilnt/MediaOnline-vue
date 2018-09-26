import { getMyUserInfo } from '../../services/my'
import { postUserInfo } from '../../services/my'
const userInfo = {
  namespaced: true,
  state: {
    userInfo:[],
    loading: false
  },
  mutations: {
    saveUserInfo(state, payload) {
      console.log(payload)
      Object.assign(state, payload)
    },
    updateGrade(state,grade) {
      state.userInfo.grade = grade
    },
    updateGender(state,gender) {
      state.userInfo.gender = gender
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    }
  },
  actions: {
    async getMyUserInfo({ dispatch, commit, state }) {
      await commit('toggleLoading', {
        loading: true
      })
      const response = await getMyUserInfo()
      await commit({
        type: 'saveUserInfo',
        userInfo: response
      })
      commit('toggleLoading', {
        loading: false
      })
    },
    async updateUserInfo({ dispatch, commit, state },{ role, gender, grade }) {
      //更新用户信息
      await commit('toggleLoading', {
        loading: true
      })
      const response = await postUserInfo({ role: role, gender:gender, grade:grade})
      if (!response)return
      commit('toggleLoading', {
        loading: false
      })
    },
    async updateUserInfoGender({ dispatch, commit, state },{ gender }) {
      //更新性别
      console.log(gender)
      const response = await postUserInfo({ gender:gender })
      if (!response)return
      commit('updateGender', {
        gender: gender
      })
    },
    async updateUserInfoGrade({ dispatch, commit, state },{ grade }) {
      //更新年级
      const response = await postUserInfo({ grade:grade })
      if (!response)return
      this.getMyUserInfo({ dispatch, commit, state })
      commit('updateGrade', {
        grade: grade
      })
    }
  }
}
export default userInfo
