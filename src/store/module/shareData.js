import { getPosterInfo,getUserInfo, getPosterforPraise ,getColumnDetail} from '../../api/shareApi'

export default {
  namespaced: true,
  state: {
    poster: {},
    user:{},
    loading: false
  },
  mutations: {
    bindPosterInfo(state, res) {
      state.loading = false
      state.poster = res
    },
    bindUserInfo(state, res) { 
      state.user = res
    }
  },
  actions: {
    //获取海报信息
    async getPosterInfo({ commit }, params) {
      const res = await getPosterInfo(params)
      console.log(res)
      commit('bindPosterInfo', res)
    },
    //获取海报信息
    async getUserInfo({ commit }, params) {
      const res = await getUserInfo(params)
      console.log(res)
      commit('bindUserInfo', res)
    },
    //集贊获取海报信息
    async getPosterforPraise({ commit }, params) {
      const res = await getPosterforPraise(params)
      console.log(res)
      commit('bindPosterInfo', res)
    },
    //专栏详情
    async getColumnDetail({dispatch, commit }, {courseId,columnType}) { 
      return await dispatch('getColumnDetail',{courseId,columnType},{root:true})    
    }
  },
  getters: {}
}
