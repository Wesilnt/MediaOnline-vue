import { getAudioDetail,postLearnRate} from '../../services/audioApi'

export default {
    state: {
        status:"default", //
        audioDetail: {},  //
        currentTime:0,    //
        maxTime: 0,       //
        playMode:'order', // order:顺序播放  single：单曲播放
        isPlaying:false,   //
        statusFunc:(commit,status)=>commit('statusUpdate', status)
    },
    mutations: { 
        //同步音频数据
        bindAudioDetail(state,res){
          state.audioDetail = res
        },
        //音频播放同步方法
        syncPlay(state, params) {
          if(params){
            state._at.src = params.audioUrl
          }
          state._at.play()
        },
        //音频播放同步方法
        syncPause(state) { 
          state._at.pause()
        },
        //音频播放同步方法
        seekTo(state,progress) {  
          state.currentTime = progress
          state._at.currentTime = progress
        },
        // 播放进度更新
        timeUpdate(state){
            state.currentTime = state._at.currentTime
            state.maxTime = state._at.duration
             
        },
        //播放状态更新
        statusUpdate(state,status){
            state.status  = status 
            state.isPlaying = !state._at.paused    
            if(status=="ended"&&state.playMode=='single') 
            {
              state._at.src = state.audioDetail.audioUrl
              state._at.play()
            }
        },
        //设置播放模式
        setPlayMode(state, playMode){
          state.playMode = playMode
        }
    },
    actions: {
        //音频单集详情
        async getAudioDetail({getters, commit,dispatch }, params) {
            const res = await getAudioDetail(params)   
            commit("bindAudioDetail", res)
            return res
        },
        //音频播放异步方式
        async asyncPlay({state, commit,dispatch }, params) { 
          if(params&&params.lessonId == state.audioDetail.id)
          return state.audioDetail
          if(params){
            const res = await dispatch('getAudioDetail',params)   
            commit("syncPlay",{audioUrl:res.audioUrl})
            return res
          }else{
            commit(state.isPlaying?"syncPause":"syncPlay")
            return state.audioDetail
          }
        },
        //音频暂停异步方式
        async asyncPause({commit}) {     
          commit("syncPause") 
        },
        //初始化播放器
        initAudio({state,getters, commit,dispatch }){
          state._at = document.createElement('AUDIO')
          state._at.style.display = 'none'
          document.body.appendChild(state._at)
          document.body.removeChild(state._at)
          state._at.addEventListener('timeupdate', () =>  commit('timeUpdate'))
          state._at.addEventListener('playing', () => commit('statusUpdate', 'play'))
          state._at.addEventListener('pause', () =>  commit('statusUpdate', 'pause'))
          //请求数据时遇到错误
          state._at.addEventListener('error', () => commit('statusUpdate', 'error'))
          //客户端主动终止下载（不是因为错误引起），
          state._at.addEventListener('abort', () =>  commit('statusUpdate', 'abort'))
          //寻找中，
          state._at.addEventListener('seeking', () => commit('statusUpdate', 'seeking'))
          //可以播放，歌曲全部加载完毕
          state._at.addEventListener('loadedmetadata', () =>   commit('statusUpdate', 'loadedmetadata'))
          //成功获取资源长度
          state._at.addEventListener('canplaythrough', () =>  commit('statusUpdate', 'canplaythrough'))
          //寻找完毕
          state._at.addEventListener('seeked', () => commit('statusUpdate', 'seeked'))
          //客户端正在请求数据
          state._at.addEventListener('progress', () =>  commit('statusUpdate', 'progress'))
          state._at.addEventListener('ended', () => {
            commit('statusUpdate', 'ended')
            if (state._mode === "single") {
              commit("syncPlay",{audioUrl:state.audioDetail.audioUrl})
            }
            if (state._mode === 'order') {
      
            }
          })
          //可以播放，但中途可能因为加载而暂停
          state._at.addEventListener('canplay', () =>  commit('statusUpdate', 'canplay'))
          //等待数据，并非错误
          state._at.addEventListener('waiting', () =>  commit('statusUpdate', 'waiting'))
          //播放速率改变
          state._at.addEventListener('ratechange', () =>   commit('statusUpdate', 'ratechange'))
          //音量改变
          state._at.addEventListener('volumechange', () =>  commit('statusUpdate', 'volumechange'))
          //网速失速
          state._at.addEventListener('stalled', () =>  commit('statusUpdate', 'stalled'))
        },
        onDestroy(){

        }
    },
    getters:{ 
      pageSize: state=> state.pageSize,
      currentPage: state => state.currentPage
    }
}