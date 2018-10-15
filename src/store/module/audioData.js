import { 
  postFavorite,
  postUnFavorite,
  getAudioDesc,
  getSingleSetList,
  getCommentList,
} from '../../api/audioApi'

export default {
  namespaced: true,
  state: {
    isLike: false,
    singleSetList: [],
    currentPage: 1,           //音频列表分页-页码
    pageSize: 20,             //分页-记录条数
    commentList: [],          //评论列表
    draftContent: { manuscript: '' },
    courseId:0
  },
  mutations: {
    bindAudioDetail(state, {res,courseId}) {
      state.audioDetail = res
      state.isLike = state.audioDetail.isLike
      state.courseId = courseId
    },
    bindFavorite(state, res) {
      state.audioDetail.isLike = !state.audioDetail.isLike
      state.isLike = state.audioDetail.isLike
    },
    bindSingleSetList(state, res) {
      state.singleSetList = res.result
    },
    bindCommentList(state, res) {
      state.commentList = res.result
    },
    bindDraftContnet(state, res) {
      state.draftContent = res
    }
  },
  actions: {
    //播放音频
    async playAudio({state, getters, commit, dispatch }, params) {
      if (params && params.lessonId) {
        dispatch('audiotaskData/asyncPlay', params, { root: true })
        .then(res => {
          let id = state.courseId
          let courseId = res.courseId
          commit('bindAudioDetail', {res,courseId})
          if(id === courseId) return
          dispatch('getSingleSetList', { courseId, pageSize: getters.pageSize })
        })
      } else {
        dispatch('audiotaskData/asyncPlay', params, { root: true })
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
    async pre({ commit }, params) {
      dispatch('audiotaskData/playPre', params, { root: true })
    },
    //悬浮按钮是否显示
    toggleFloatButton({commit},isShow){ 
      commit('audiotaskData/setFloatButton', isShow, { root: true })
    },
    //绑定专栏名
    async bindCourseName({commit}, courseName){
      commit('audiotaskData/bindCourseName', courseName, { root: true })
    },
    //音频单集详情
    async getAudioDetail({ getters, commit, dispatch }, params) {
      dispatch('audiotaskData/getAudioDetail', params, { root: true })
      .then(res => {
        commit('bindAudioDetail', res)
        dispatch('getSingleSetList', {courseId: res.courseId, pageSize: getters.pageSize})
      })
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
    async getAudioDesc({ state, commit, dispatch }, lessonId) {
      let params = { lessonId: lessonId }
      const res = await getAudioDesc(params)
      commit('bindDraftContnet', res)
    },
    //音频单集列表
    async getSingleSetList({ commit }, params) {
      params.currentPage = (params.currentPage | 1) + 1
      const res = await getSingleSetList(params)
      commit('bindSingleSetList', res)
    },
    //音频单集列表
    async getCommentList({ commit }, params) {
      params.currentPage = (params.currentPage | 1) + 1
      const res = await getCommentList(params)
      commit('bindCommentList', res)
    }
  },
  getters: {
    isLoading:(state,getters,rootState) => rootState.audiotaskData.status,
    audio: (state, getters, rootState) => rootState.audiotaskData.audioDetail,
    audioId: (state, getters, rootState) => rootState.audiotaskData.audioId,
    courseId: (state, getters, rootState) => rootState.audiotaskData.courseId,
    currentTime: (state, getters, rootState) => Math.round(rootState.audiotaskData.currentTime), 
    maxTime: (state, getters, rootState) => Math.round(rootState.audiotaskData.maxTime),
    playMode: (state, getters, rootState) => rootState.audiotaskData.playMode,
    status: (state, getters, rootState) => rootState.audiotaskData.status,
    playing: (state, getters, rootState) => rootState.audiotaskData.isPlaying,
    pageSize: state => state.pageSize,
    currentPage: state => state.currentPage
  }
}
