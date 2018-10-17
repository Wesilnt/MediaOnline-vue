import { getAudioDetail, postLearnRate } from '../../api/audioApi'
import { throttle } from '../../utils/utils' 
import {Toast} from 'vant'
import audioData from './audioData' 

export default {
  namespaced:true,
  state: {
    forceHidenFloat:false,
    showFloat:false,
    status: 'default', //播放状态
    audioDetail: {}, //音频数据
    audioId: 0, //播放音频ID
    audioUrl: '', //播放音频地址
    coverPic:'',  //封面地址
    currentTime: 0, //播放进度
    maxTime: 0, //音频总时长
    playMode: 'order', // order:顺序播放  single：单曲播放
    isPlaying: false, //是否正在播放
    isBuffering: false, //是否处于缓冲中
    courseName:"", //专栏名
    courseId:-1,
    throttle: null,
    statusFunc: (commit, status) => commit('statusUpdate', status),
    saveProgress: (id, currentTime, maxTime) => {
      localStorage.setItem('learntime-' + id,JSON.stringify({ currentTime, maxTime }))
    }
  },
  mutations: {
    //绑定专栏名
    bindCourseName(state,courseName){
      state.courseName = courseName
    },
    initThrottle(state) {
      state.throttle = throttle(state.saveProgress, 1000)
    },
    //同步音频数据
    bindAudioDetail(state, res) {
      state.audioDetail = res
      state.audioUrl = res.audioUrl
      state.audioId = res.id
      state.courseId = res.courseId
      state.coverPic = res.coverPic
    },
    //音频播放同步方法
    syncPlay(state, params) {
      if (params)  {
        state._at.src = params.audioUrl
        state.columnType = params.columnType || state.columnType
      }
      let localCache = localStorage.getItem('learntime-' + state.audioDetail.id) 
      if(localCache) state.maxTime = parseInt(JSON.parse(localCache).maxTime) 
      state._at.play().catch(e=> { 
        if (!localCache) return
        let currentTime = JSON.parse(localCache).currentTime 
        if (!currentTime || currentTime >= state._at.duration - 5) currentTime = 0
        state.currentTime = state._at.currentTime = parseFloat(currentTime)
        state.maxTime = state._at.duration 
     })
    },
    //音频播放同步方法
    syncPause(state) {
      state._at.pause()
    },
    //音频播放同步方法
    seekTo(state, progress) {   
      if(isNaN(progress))return
      state.currentTime = progress
      state._at.currentTime = progress 
    },
    // 播放进度更新
    timeUpdate(state) {
      state.currentTime = state._at.currentTime
      state.maxTime = state._at.duration 
      if (state.throttle)
        {
          state.throttle(state.audioDetail.id, state.currentTime, state.maxTime)
        }
    },
    //播放状态更新
    statusUpdate(state, status) {
      console.log("status",status)
      state.status = status
      state.isPlaying = !state._at.paused
      if(status == "loadstart" 
         || status == "seeking" 
         || status == "waiting"){
        state.isBuffering = true
      }
      if(status == "play" 
      || status == "pause" 
      || status == "canplaythrough" 
      || status == "seeked" 
      || status == "error"
      || status == "abort"){
        state.isBuffering = false
      }
      if(status == 'loadedmetadata'){//獲取音频总长度

      }
      state.showFloat = true
    },
    //设置播放模式
    setPlayMode(state, playMode) {
      state.playMode = playMode
    },
    //悬浮按钮是否显示
    setFloatButton(state,isShow){ 
      state.forceHidenFloat = isShow
    }
  },
  actions: {
    //音频单集详情
    async getAudioDetail({ getters, commit, dispatch }, params) {
      const res = await getAudioDetail(params)
      if(!res)return
      let localCache = localStorage.getItem('learntime-' + res.id)
      if (localCache) {
        //提交本地缓存
        let data = JSON.parse(localCache)
        let listenTime = parseInt(data.currentTime)
        let lessonId = res.id
        dispatch('postLearnRate', { lessonId, listenTime })
      } else {
        //更新本地缓存
        let data = JSON.stringify({currentTIme: res.learnTime,maxTime: res.totalTime})
        localStorage.setItem('learntime-' + res.id, data)
      }
      console.log(res)
      commit('bindAudioDetail', res)
      return res
    },
    //音频播放异步方式
    async asyncPlay({ state, commit, dispatch }, params) {
      if (params && params.lessonId == state.audioDetail.id) {
        if (!state.isPlaying) commit('syncPlay')
        return state.audioDetail
      }
      if (params) {
        const res = await dispatch('getAudioDetail', params)
        commit('syncPlay', { audioUrl: res.audioUrl,columnType:params.columnType })
        return res
      } else {
        commit(state.isPlaying ? 'syncPause' : 'syncPlay')
        return state.audioDetail
      }
    },
    //音频暂停异步方式
    async asyncPause({ commit }) {
      commit('syncPause')
    },
    //下一集
    async playNext({ state,commit,rootState, dispatch }) { 
     if(rootState.columnType
        &&(rootState.columnType == "1003" 
        || rootState.columnType == "1007")
        &&rootState.columnDetail){
        let useraccessstatus = rootState.columnDetail.userAccessStatus
       if(useraccessstatus
         && 1001 != useraccessstatus 
         && 1003 != useraccessstatus 
         && 1008 != useraccessstatus) 
         return
      }
      let nextId = state.audioDetail.nextLessonId
      if (nextId&&-1!=nextId) {
        commit('syncPause')
        dispatch('asyncPlay', { lessonId: state.audioDetail.nextLessonId })
      } else {
        // Toast('已经是最后一条')
      }
    },
    //上一集
    async playPre({ state,commit,rootState, dispatch }) { 
      if(rootState.columnType
           &&(rootState.columnType == "1007" 
           || rootState.columnType == "1003")
           && rootState.columnDetail){
          let useraccessstatus = rootState.columnDetail.userAccessStatus
          if(useraccessstatus
            && 1001 != useraccessstatus 
            && 1003 != useraccessstatus 
            && 1008 != useraccessstatus) 
            return
      } 
      let preId = state.audioDetail.preLessonId
      if (preId&&-1!=preId) {
        commit('syncPause')
        dispatch('asyncPlay', { lessonId: state.audioDetail.preLessonId })
      } else {
        // Toast('这是第一条')
      } 
    },
    //上传音频进度
    async postLearnRate({ commit }, params) {
      if (params && params.listenTime <= 1) return
      const res = await postLearnRate(params)
    },
    //初始化播放器
    async initAudio({ state, getters, commit, dispatch }) {
      commit('initThrottle') 
      state._at = document.createElement('AUDIO')
      state._at.style.display = 'none'
      document.body.appendChild(state._at)
      document.body.removeChild(state._at)
      state._at.addEventListener('timeupdate', () => commit('timeUpdate'))
      state._at.addEventListener('playing', () =>commit('statusUpdate', 'play'))
      state._at.addEventListener('pause', () => commit('statusUpdate', 'pause'))
      //请求数据时遇到错误
      state._at.addEventListener('error', () => commit('statusUpdate', 'error'))
      //客户端主动终止下载（不是因为错误引起），
      state._at.addEventListener('abort', () => commit('statusUpdate', 'abort'))
      //寻找中，
      state._at.addEventListener('seeking', () =>commit('statusUpdate', 'seeking'))
      //成功获取资源长度 
      state._at.addEventListener('loadedmetadata', () =>commit('statusUpdate', 'loadedmetadata'))
      //可以播放，歌曲全部加载完毕 
      state._at.addEventListener('canplaythrough', () =>commit('statusUpdate', 'canplaythrough'))
      //寻找完毕
      state._at.addEventListener('seeked', () =>commit('statusUpdate', 'seeked'))
      //客户端正在请求数据
      state._at.addEventListener('progress', () =>commit('statusUpdate', 'progress'))
      state._at.addEventListener('ended', () => {
        commit('statusUpdate', 'ended')
        let currentTime = 0
        let maxTime = state._at.duration
        let data = { currentTime, maxTime }
        if (state.playMode == 'single') {
          data.currentTime = 0
          commit('syncPlay', { audioUrl: state.audioDetail.audioUrl })
        }
        if (state.playMode == 'order') {
          data.currentTime = 0
          dispatch('playNext') //播放下一集
        }
        localStorage.setItem('learntime-' + state.audioDetail.id,JSON.stringify(data))
      })
      //可以播放，但中途可能因为加载而暂停
      state._at.addEventListener('canplay', () =>commit('statusUpdate', 'canplay'))
      //等待数据，并非错误
      state._at.addEventListener('waiting', () =>commit('statusUpdate', 'waiting'))
      //播放速率改变
      state._at.addEventListener('ratechange', () =>commit('statusUpdate', 'ratechange'))
      //音量改变
      state._at.addEventListener('volumechange', () =>commit('statusUpdate', 'volumechange'))
      //网速失速
      state._at.addEventListener('stalled', () =>commit('statusUpdate', 'stalled'))
    },
    onDestroy({state}) {
      // state._at.removeEventListener()

    }
  },
  getters: {
    pageSize: state => state.pageSize,
    currentPage: state => state.currentPage,
    //FreeZone(1001) 免费专区 OnlineCourse(1003) 在线课堂  OnlineVision(1005) 在线视野  Readings(1007) 读书会
    columnType: (state,getters,rootState)=>rootState.columnType, 
  },
  modules:{
    audioData
  }
}
