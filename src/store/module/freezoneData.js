import {getFreezoneList, postLearnRate,doFreeLesson,getUserByToken} from '../../services/freezoneApi'
export default {
  namespaced:true,
  state: {
    pageSize:20,
    currentPage:1,
    freeZoneList:[],
    loading:false,
    finished:false,
    isSubscribe:true
  },
  mutations: {
     bindFreezoneList(state,{freeZoneList,page,totalCount}){ 
       state.currentPage = page
       if(1 == state.currentPage)state.freeZoneList=[]  
       state.freeZoneList = state.freeZoneList.concat(freeZoneList)
       state.finished =  state.freeZoneList.length>=totalCount
       state.loading = false
     },
     toggleLoading(state,params){
      state.loading = params.loading
     },
     subscribeSuccess(state,isSubscribe){
      state.isSubscribe = isSubscribe
     }
  },
  actions: {
     async getFreezoneList({state,dispatch,commit},currentPage){ 
       if(state.finished || state.loading)return
      await commit('toggleLoading', {loading: true}) 
      let page = currentPage || state.currentPage + 1
      const res = await getFreezoneList({
        courseId:-1,
        pageSize:state.pageSize,
        currentPage:page
      })  
      console.log(res)
      let totalCount = res.totalCount
      commit('bindFreezoneList',{freeZoneList:res.result,page,totalCount})
      //上传最新学习进度
      res.result.map(item=>{ 
        let localCache = localStorage.getItem('learntime-'+item.id)
        if(!localCache) return
        let learnJson = JSON.parse(localCache)
        let lessonId = item.id
        let listenTime = parseInt( learnJson.currentTime )
        let params = {lessonId,listenTime}
        dispatch('postLearnRate',params)  
      })
     },
    //上传音频进度
    async postLearnRate({commit},params) { 
      if(params && params.listenTime<=1)return    
        const res = await postLearnRate(params)
    },
    //订阅专栏
    async doFreeLesson({commit}) {  
        const res = await doFreeLesson({timestamp:Date.now()}) 
        if(!res)return
        commit('subscribeSuccess', true)
    },
    //获取用户信息是否订阅免费专区
    async getUserByToken({commit},params) {     
        const res = await getUserByToken(params)
        if(!res)return
        console.log(res)
        commit('subscribeSuccess', res.subscribe)
    },
  },
  getters:{
    playingId: (state, getters, rootState)=>  rootState.audiotask.audioDetail.id,
  }
}