import {getPosterInfo,getPosterforPraise} from "../../services/shareApi"

export default {
  namespaced:true,
  state:{
     poster:{},
     loading:true
  },
  mutations:{
    bindPosterInfo(state, res){
      state.loading = false
      state.poster = res
    }

  },
  actions:{
    //获取海报信息
    async getPosterInfo({commit},params){
      const res = await getPosterInfo(params)
      console.log(res)
      commit('bindPosterInfo',res)
    },
    //获取海报信息
    async getPosterforPraise({commit},params){
      const res = await getPosterforPraise(params)
      console.log(res)
      commit('bindPosterInfo',res)
    }
  },
  getters:{}
}