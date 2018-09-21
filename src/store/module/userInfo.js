import { getMyUserInfo } from '../../services/my'
import { postUserInfo } from '../../services/my'
const userInfo = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
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
    async updateUserInfo({ dispatch, commit, state },{ role, gender, grade }) {
      //更新用户信息
      console.log(role + '\t' + gender + '\t' + grade)
      const response = await postUserInfo({ role: role, gender:gender, grade:grade})
      if (!response)return
      console.log(response)

    }
  }
}
export default userInfo
