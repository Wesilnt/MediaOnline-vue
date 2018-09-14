import {getPosterInfo} from "../../services/shareApi"

export default {
  namespaced:true,
  state:{
     poster:{}
  },
  mutations:{
    bindPosterInfo(state, res){
      state.poster = res
    }

  },
  actions:{
    //获取海报信息
    async getPosterInfo({commit},params){
      const res = await getPosterInfo(params)
      console.log(res)
      commit('bindPosterInfo',res)
    }
  },
  getters:{}
}