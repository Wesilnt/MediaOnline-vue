import { getAudioDetail, postFavorite,postUnFavorite, getAudioDesc, getSingleSetList,getCommentList } from '../../services/audioApi'

export default {
    namespaced: true,
    state: {
        isLike:{isLoad:true, like:false},
        singleSetList:[],
        currentPage: 1,  //音频列表分页-页码
        pageSize:20,      //分页-记录条数
        commentList:[],    //评论列表  

    },
    mutations: {
        bindAudioDetail(state, res) {
            state.audioDetail = res 
            console.log(res)
            state.isLike ={isLoad:true,like:state.audioDetail.isLike}
        },
        postFavorite(state, res) {
          state.audioDetail.isLike = !state.audioDetail.isLike
          state.isLike ={isLoad:false,like:state.audioDetail.isLike}
        },
        getAudioDesc(state, res) {

        },
        bindSingleSetList(state, res) { 
         state.singleSetList = res.result
        },
        getCommentList(state, res) {
         state.commentList = res.result
        },
    },
    actions: { 
        //播放音频
        async playAudio({getters, commit,dispatch }, params){ 
          if(params&&params.lessonId){
            dispatch('asyncPlay', params, { root: true })
            .then(res=>{
              dispatch('getSingleSetList',{courseId:res.courseId,pageSize:getters.pageSize})
              commit('bindAudioDetail',res)
            }) 
          }else{
            dispatch('asyncPlay', params, { root: true })
          }
        },
        //播放音频
        async pauseAudio({dispatch}){ 
          dispatch('asyncPause', null, { root: true })
        },
        //播放音频
        async setPlayMode({commit},playMode){ 
          commit('setPlayMode', playMode, { root: true })
        },
        //拖动音频进度
        async seekTo({commit},progress){ 
          commit('seekTo', progress, { root: true })
        },
        //音频单集详情
        async getAudioDetail({getters, commit,dispatch }, params) {
          dispatch('getAudioDetail', params, { root: true })
          .then(res=>{ 
            commit('bindAudioDetail',res)
            dispatch('getSingleSetList',{courseId:res.courseId,pageSize:getters.pageSize})
          })  
        },
        //音频收藏 我喜欢的
        async postFavorite({ commit }, params) {
            const res = await postFavorite(params)
            console.log("我喜欢的")
            console.log(res)
            commit("postFavorite", res)
        },
        //音频取消 我喜欢的
        async postFavorite({ commit }, params) {
            const res = await postUnFavorite(params)
            console.log("取消我喜欢的")
            console.log(res)
            commit("postFavorite", res)
        },
        //音频单集文稿详情
        async getAudioDesc({ commit }, params) {
            const res = await getAudioDesc(params)
            console.log(res)
            commit("getAudioDesc", res)
        },
        //音频单集列表
        async getSingleSetList({ commit }, params) {
            params.currentPage = (params.currentPage|1)+1
            const res = await getSingleSetList(params)
            commit("bindSingleSetList", res) 
        },
        //音频单集列表
        async getCommentList({ commit }, params) {
            params.currentPage = (params.currentPage|1)+1
            const res = await getCommentList(params)
            console.log(res)
            commit("getCommentList", res)
        }
    },
    getters:{ 
      audio: (state, getters, rootState)=>  rootState.audiotask.audioDetail ,
      currentTime: (state, getters, rootState)=>  (touching,progress)=> touching?progress:rootState.audiotask.currentTime ,
      maxTime: (state, getters, rootState)=> rootState.audiotask.maxTime ,
      playMode: (state, getters, rootState)=> rootState.audiotask.playMode ,
      status: (state, getters, rootState)=> rootState.audiotask.status ,
      playing: (state, getters, rootState)=> rootState.audiotask.isPlaying ,
      pageSize: state=> state.pageSize,
      currentPage: state => state.currentPage
    }
}