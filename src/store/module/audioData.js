import { getAudioDetail, postFavorite,postUnFavorite, getAudioDesc, getSingleSetList,getCommentList } from '../../services/audioApi'
import { Toast } from 'vant';

export default {
    namespaced: true,
    state: {
        isLike:false,
        singleSetList:[],
        currentPage: 1,    //音频列表分页-页码
        pageSize:20,       //分页-记录条数
        commentList:[],    //评论列表  
        draftContent:{}

    },
    mutations: {
        bindAudioDetail(state, res) {
            state.audioDetail = res  
            state.isLike = state.audioDetail.isLike
        },
        postFavorite(state, res) {
          state.audioDetail.isLike = !state.audioDetail.isLike
          state.isLike = state.audioDetail.isLike
        },
        getAudioDesc(state, res) {

        },
        bindSingleSetList(state, res) { 
         state.singleSetList = res.result
        },
        getCommentList(state, res) {
         state.commentList = res.result
        },
        bindDraftContnet(state,res){
          state.draftContent = res
        }
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
        //下一集
        async next({dispatch},params){ 
          dispatch('playNext', params, { root: true })
        },
        //上一集
        async pre({commit},params){ 
          dispatch('playPre', params, { root: true })
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
            if(res) commit("postFavorite", res) 
        },
        //音频取消 我喜欢的
        async postFavorite({ commit }, params) {
            const res = await postUnFavorite(params)
            if(res)commit("postFavorite", res) 
        },
        //音频单集文稿详情
        async getAudioDesc({ state,commit,dispatch },lessonId) {
          let params = {lessonId: lessonId}
          const res = await getAudioDesc(params) 
            console.log(res)
          commit('bindDraftContnet',res)
          //     if(state.audioDetail){
          //   commit("getAudioDesc", res)
          // }else{
          //   dispatch('getAudioDetail', {lessonId}, { root: true })
          // }
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