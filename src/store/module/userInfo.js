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
    async updateUserInfo({ dispatch, commit, state },{ identiy,grade,sex }) {
      //更新用户信息
      const response = await postUserInfo({ role: identiy,grade:grade, gender:sex})
      if (!response)return

    }
  }
}
export default userInfo
