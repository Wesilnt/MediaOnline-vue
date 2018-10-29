import { getAudioDetail, postLearnRate,getSingleSetList } from '../../api/audioApi'
import { throttle } from '../../utils/utils'  
import audioData from './audioData'  
import videoCourseDetailData from './videoCourseDetailData'  

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
    pageSize: 20,
    singleSetList:[],
    statusFunc: (commit, status) => commit('statusUpdate', status),
    saveProgress: (id, currentTime, maxTime) => {
      localStorage.setItem('learntime-' + id,
      JSON.stringify({lessonId: id,currentTime,maxTime,uploaded: 'no' }))
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
      if (params) state._at.src = params.audioUrl  
      state._at.play().then(()=>{
        let localCache = localStorage.getItem('learntime-' + state.audioDetail.id) 
        let listenJson = localCache? JSON.parse(localCache): null 
        if(listenJson){ 
          if(listenJson.currentTime + 3 > listenJson.maxTime) listenJson.currentTime = 0
         state._at.currentTime = parseInt(listenJson.currentTime)
        } 
      }).catch(e=> { 
        console.error(state.audioDetail,'音频播放出错了')
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
      if(status == 'canplay'){      //设置播放进度
        // let localCache = localStorage.getItem('learntime-' + state.audioDetail.id) 
        // let listenJson = localCache? JSON.parse(localCache): null 
        // if(listenJson){
        //   state.maxTime = parseInt(listenJson.maxTime) 
        //   if(listenJson.currentTime + 3 > listenJson.maxTime) listenJson.currentTime = 0
        //   state.currentTime = state._at.currentTime = parseInt(listenJson.currentTime)
        // } 
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
    },
    bindSingleSetList(state, res) { 
      state.singleSetList = res.result
    },
    //本地缓存音频播放进度
    setListenTime(state,params){
      let data = JSON.stringify(params)
      localStorage.setItem('learntime-' + params.lessonId, data)
    },
    //更新本地音频进度
    updateListenTime(state, params){
      let localCache = localStorage.getItem('learntime-' + params.lessonId) 
      let listenJson = localCache? JSON.parse(localCache):{}
      if(listenJson){
        listenJson.uploaded = 'yes' 
      }else{
        listenJson = {
          lessonId:params.learnId,
          uploaded:'yes',
          currentTime : params.learnTime,
          maxTime : params.maxTime
        }
      }
      localStorage.setItem('learntime-' + params.lessonId,JSON.stringify(listenJson))
    }
  },
  actions: {
    //音频单集详情
    async getAudioDetail({ state, commit, dispatch }, params) {
      const res = await getAudioDetail(params)
      if(!res) return
      let localCache = localStorage.getItem('learntime-' + res.id)
      let listenJson = localCache ? JSON.parse(localCache):{} 
      //更新本地缓存
      if (listenJson.uploaded && listenJson.uploaded === 'yes') { 
        await commit('updateListenTime',{lessonId: res.id, learnTime: res.learnTime,maxTime: res.totalTime}) 
      } else {
        //提交本地缓存 
        let listenTime = parseInt(listenJson.currentTime)
        let maxTime = parseInt(listenJson.maxTime)
        let lessonId = res.id
        dispatch('postLearnRate', { lessonId, listenTime, maxTime})
      } 
      let courseId = state.courseId
      commit('bindAudioDetail', res)                                                                   //更新单集详情
      if(courseId == res.courseId) return res
      dispatch('getSingleSetList', { courseId:res.courseId, pageSize: state.pageSize })                //获取单集列表
      return res
    },
    //音频播放异步方式
    async asyncPlay({ state, commit, dispatch }, params) {
      //1. 如果播放的是当前音频，则直接播放
      if (params && params.lessonId == state.audioDetail.id) {
        if (!state.isPlaying) commit('syncPlay')
        return state.audioDetail
      } 
      //2. 异步转同步播放
      if (params) {
        const res = await dispatch('getAudioDetail', params) 
        if(!res) return 
        commit('syncPlay', { audioUrl: res.audioUrl })
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
    async playNext({ state,commit,rootState, dispatch },params) { 
     let nextId = params && params.learnId? params.lessonId : state.audioDetail.nextLessonId 
     if(rootState.columnType
        &&(rootState.columnType == "1003" 
        || rootState.columnType == "1007")
        &&rootState.columnDetail){
        let useraccessstatus = rootState.columnDetail.userAccessStatus 
       if(1001 != useraccessstatus 
         && 1003 != useraccessstatus 
         && 1008 != useraccessstatus) {
           let listenable  = true
           state.singleSetList.some(item=>{ 
              if(item.id == nextId && !item.isFree){
                listenable = false
                // Toast('已经是最后一条')
                return
              }
            }) 
            if(!listenable)return
         }
      }
      if (nextId && -1 != nextId) {
        commit('syncPause')
        dispatch('asyncPlay', { lessonId: state.audioDetail.nextLessonId })
      } else {
        // Toast('已经是最后一条')
      }
    },
    //上一集
    async playPre({ state,commit,rootState, dispatch },params) { 
      let preId = params && params.learnId? params.lessonId :state.audioDetail.preLessonId
      if(rootState.columnType
           &&(rootState.columnType == "1007" 
           || rootState.columnType == "1003")
           && rootState.columnDetail){
          let useraccessstatus = rootState.columnDetail.userAccessStatus
          if(useraccessstatus
            && 1001 != useraccessstatus 
            && 1003 != useraccessstatus 
            && 1008 != useraccessstatus) {
            let listenable  = true
            state.singleSetList.some(item=>{ 
               if(item.id == preId && !item.isFree){
                 listenable = false 
                 return
               }
             }) 
             if(!listenable)return
          }
      } 

      if (preId && -1 != preId) {
        commit('syncPause')
        dispatch('asyncPlay', { lessonId: state.audioDetail.preLessonId })
      } else {
        // Toast('这是第一条')
      } 
    },
    //上传音频进度
    async postLearnRate({commit}, params) {
      if (params && params.listenTime <= 0) return 
      if(isNaN(params.listenTime))return
      const res = await postLearnRate(params) 
      commit('updateListenTime', {learnId: params.lessonId,listenTime : params.listenTime,maxTime : params.maxTime})
    },
    //音频单集列表
    async getSingleSetList({ commit }, params) {
      params.currentPage = (params.currentPage | 1) + 1
      const res = await getSingleSetList(params)
      commit('bindSingleSetList', res)
    },
    //初始化播放器
    async initAudio({ state,  commit, dispatch }) {
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
        let maxTime = state._at.duration
        let data = { currentTime :0, maxTime } 
        if (state.playMode == 'single') {
          commit('syncPlay', { audioUrl: state.audioDetail.audioUrl })
        }
        if (state.playMode == 'order') { 
          dispatch('playNext') //播放下一集
        }
        localStorage.setItem('learntime-' + state.audioDetail.id,JSON.stringify(data))
        //更新播放时间
        let lessonId = state.audioDetail.id 
        dispatch('postLearnRate', { lessonId, listenTime: parseInt(maxTime)})
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
    }
  },
  getters: {
    pageSize: state => state.pageSize,
    currentPage: state => state.currentPage,
    //FreeZone(1001) 免费专区 OnlineCourse(1003) 在线课堂  OnlineVision(1005) 在线视野  Readings(1007) 读书会
    columnType: (state,getters,rootState)=>rootState.columnType, 
  },
  modules:{
    audioData,
    videoCourseDetailData
  }
}
