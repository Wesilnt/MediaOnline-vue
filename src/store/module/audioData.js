import { courseType } from '../../utils/config'
import { 
  postFavorite,
  postUnFavorite,
  getAudioDesc,
  // getSingleSetList,
  getCommentList,
} from '../../api/audioApi' 

export default {
  namespaced: true,
  state: {
    isLike: false,
    singleSetList: [],
    currentPage: 1,           //音频列表分页-页码
    pageSize: 10,             //分页-记录条数
    commentList: [],          //评论列表
    draftContent: { manuscript: '' },
    courseId:-1, 
    columnId:-1, 
    finished:false,
    pageLoading:false 
  },
  mutations: {
    bindAudioDetail(state, res) {
      state.audioDetail = res
      if(state.audioDetail)
      state.isLike = state.audioDetail.isLike
    },
    bindFavorite(state, res) {
      state.audioDetail.isLike = !state.audioDetail.isLike
      state.isLike = state.audioDetail.isLike
    }, 
    bindSingleSetList(state, {currentPage,courseId,finished,res}) {
      state.currentPage = currentPage
      state.courseId = courseId
      state.finished = finished
      state.singleSetList = 1==currentPage?res.result: state.singleSetList.concat(res.result) 
    },
    bindCommentList(state, res) {
      state.commentList = res.result
    },
    bindColumnId(state, columnId) {
      state.columnId = columnId
    },
    bindDraftContnet(state, res) {
      state.draftContent = res
    },
    clearData(state, res) {
      state.courseId = -1
      state.columnId = -1
    },
    toggleLoading(state,isLoading){
      state.pageLoading = isLoading
    }
  },
  actions: {
    //播放音频
    async playAudio({state, commit, dispatch }, params) {
      if (params && params.lessonId) { 
        dispatch('audiotaskData/asyncPlay', params, { root: true })
        .then(res => { 
          if(!res)  return
          commit('bindAudioDetail', res)                                          //绑定音频数据
          let columnId = res.courseId
          if(state.columnId === columnId) return  
          let columnType = params.columnType  
          await commit('bindColumnId',columnId)
          dispatch('setShareInfo', { courseId:columnId, columnType })            //设置分享信息 
          dispatch('getSingleSetList', { courseId, currentPage:1})                //获取单集列表
        })
      } else { 
        dispatch('audiotaskData/asyncPlay', params, { root: true })               //暂停、播放
      }
    },
    //播放音频
    async pauseAudio({ dispatch }) {
      dispatch('audiotaskData/asyncPause', null, { root: true })
    },
    //播放音频
    async setPlayMode({ commit }, playMode) {
      commit('audiotaskData/setPlayMode', playMode, { root: true })
    },
    //拖动音频进度
    async seekTo({ commit }, progress) {
      commit('audiotaskData/seekTo', progress, { root: true })
    },
    //下一集
    async next({ dispatch }, params) {
      dispatch('audiotaskData/playNext', params, { root: true })
    },
    //上一集
    async pre({ dispatch }, params) {
      dispatch('audiotaskData/playPre', params, { root: true })
    },
    //悬浮按钮是否显示
    async toggleFloatButton({commit},isShow){ 
      commit('audiotaskData/setFloatButton', isShow, { root: true })
    },
    //绑定专栏名
    async bindCourseName({commit}, courseName){
      commit('audiotaskData/bindCourseName', courseName, { root: true })
    }, 
    //音频收藏 我喜欢的
    async postFavorite({ commit }, params) {
      const res = await postFavorite(params)
      if (res) commit('bindFavorite', res)
    },
    //音频取消 我喜欢的
    async postUnFavorite({ commit }, params) {
      const res = await postUnFavorite(params)
      if (res) commit('bindFavorite', res)
    },
    //音频单集文稿详情
    async getAudioDesc({commit}, lessonId) {
      let params = { lessonId: lessonId }
      const res = await getAudioDesc(params)
      commit('bindDraftContnet', res)
    },
    //音频单集列表
    async getSingleSetList({ commit ,state}, {courseId,currentPage}) {
      commit('toggleLoading',true) 
      let params = {pageSize: state.pageSize}
      params.currentPage = currentPage||state.currentPage + 1
      params.courseId = courseId || state.courseId
      const res = await getSingleSetList(params)
      console.log("单集列表:",res)
      let finished = state.singleSetList.length + res.result.length >= res.totalCount
      commit('bindSingleSetList', {...params,finished,res})
      commit('toggleLoading',false)
    },
    //音频单集列表
    async getCommentList({ commit }, params) {
      params.currentPage = (params.currentPage || 1) + 1
      const res = await getCommentList(params)
      commit('bindCommentList', res)
    },
    //设置分享信息
    async setShareInfo({commit,dispatch,rootState},{courseId,columnType}){    
      if(courseId <= 0) return
      commit('bindColumnId',courseId) 
      const course = await dispatch('getColumnDetail',{courseId,columnType,useCache:true},{root:true}) 
      if(!course) return
      let shareData = {
        // link:  `${rootState.url}/#/${courseType[columnType]}${courseId}`,
        link:  `${rootState.url}/#/detail/${columnType}/${courseId}`,
        title: `${rootState.columnDetail.name}`,
        desc: '你一定会爱上国学课...',
        imgUrl:`${rootState.columnDetail.sharePostUrl}?imageView2/1/w/100/h/100/format/jpg`,
        successCB: () => console.log('分享回调成功'),
        cancelCB: () => console.log('分享回调失败')
      }
      console.log('Audio-ShareLink:',shareData.link)
      dispatch('setWxShareFriend',shareData,{root:true})
      dispatch('setWxShareZone',shareData,{root:true})  
    }
  },
  getters: {
    isLoading:(state,getters,rootState) => rootState.audiotaskData.status,
    isBuffering:(state,getters,rootState) => rootState.audiotaskData.isBuffering,
    audio: (state, getters, rootState) => rootState.audiotaskData.audioDetail,
    audioId: (state, getters, rootState) => rootState.audiotaskData.audioId,
    courseId: (state, getters, rootState) => rootState.audiotaskData.courseId,
    currentTime: (state, getters, rootState) => Math.round(rootState.audiotaskData.currentTime), 
    maxTime: (state, getters, rootState) => Math.round(rootState.audiotaskData.maxTime),
    playMode: (state, getters, rootState) => rootState.audiotaskData.playMode,
    status: (state, getters, rootState) => rootState.audiotaskData.status,
    playing: (state, getters, rootState) => rootState.audiotaskData.isPlaying,
    singleSetList:(state,getters,rootState)=> rootState.audiotaskData.singleSetList,
    pageSize: state => state.pageSize,
    currentPage: state => state.currentPage
  }
}
