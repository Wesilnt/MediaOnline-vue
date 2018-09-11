import * as _request from './request.js'
const AUDIO_URL = '/lesson/lessonDetail'
const UPLOAD_URL = '/lesson/lessonListenRs'
const errorList = {
  '10001': '系统错误',
  '10002': '网络错误',
  '10003': '文件错误',
  '10004': '格式错误',
  '-1': '未知错误'
}

export default class AudioTask {
  //当前课节数组
  _audio = {}
  //当前是否正在播放 true：停止/暂停
  _isPaused = true
  //播放状态
  _state = 'default'
  //播放模式
  _mode = 'order' //播放模式  order：顺序  random：随机  single:单个
  _timeListeners = new Array()
  _stateListeners = new Array()
  //获取单例对象
  static getInstance() {
    if (!this.instance) {
      this.instance = new AudioTask()
    }
    return this.instance
  }

  constructor() {
    this._at = document.createElement('AUDIO')
    this._init()
    this._audios = []
    this._at.autoplay = false
    // this._at.crossOrigin = 'anonymous'
    this._at.src = 'http://qiniu.shbaoyuantech.com/FpvhMim7BKmiEU3x3oqkgL-CGPYy'
    this._at.style.display = 'none'
    document.body.appendChild(this._at)
    document.body.removeChild(this._at)
    // this._audio = {
    //   "audioUrl": "http://file.djvdj.com/data/2018/02/09/1518149227.mp3",
    //   "authorId": 0,
    //   "courseId": 0,
    //   "createTime": "2018-03-22T02:01:05.504Z",
    //   "description": "string",
    //   "id": 0,
    //   "isFree": "string",
    //   "lastModifyTime": "2018-03-22T02:01:05.504Z",
    //   "nextLessonId": 0,
    //   "preLessonId": 0,
    //   "status": "string",
    //   "title": "逆流成河-金南玲",
    //   "totalTime": 0,
    //   "totalTimeStr": "string",
    //   "videoUrl": "string",
    //   "viewCount": 0,
    //   "weight": 0
    // }
  }

  //初始化
  _init() {
    //进度事件监听
    this._at.addEventListener('timeupdate', () => {
      this._timeListeners.map(_listener => {
        _listener(this._at.currentTime, this._at.duration)
      })
    })
    this._at.addEventListener('playing', () => {
      this._setState('play')
    })
    this._at.addEventListener('pause', () => {
      this._setState('pause')
    })
    //请求数据时遇到错误
    this._at.addEventListener('error', () => {
      this._setState('error')
    })
    //客户端主动终止下载（不是因为错误引起），
    this._at.addEventListener('abort', () => {
      this._setState('abort')
    })
    //寻找中，
    this._at.addEventListener('seeking', () => {
      this._setState('seeking')
    })
    //可以播放，歌曲全部加载完毕
    this._at.addEventListener('loadedmetadata', () => {
      this._setState('loadedmetadata')
    })
    //成功获取资源长度
    this._at.addEventListener('canplaythrough', () => {
      this._setState('canplaythrough')
    })
    //寻找完毕
    this._at.addEventListener('seeked', () => {
      this._setState('seeked')
    })
    //客户端正在请求数据
    this._at.addEventListener('progress', () => {
      this._setState('progress')
    })
    this._at.addEventListener('ended', () => {
      this._setState('ended')
      if (this._mode === "single") {
        this._play()
      }
      if (this._mode === 'order') {

      }
    })
    //可以播放，但中途可能因为加载而暂停
    this._at.addEventListener('canplay', () => {
      this._setState('canplay')
    })
    //等待数据，并非错误
    this._at.addEventListener('waiting', () => {
      this._setState('waiting')
    })
    //播放速率改变
    this._at.addEventListener('ratechange', () => {
      this._setState('ratechange')
    })
    //音量改变
    this._at.addEventListener('volumechange', () => {
      this._setState('volumechange')
    })
    //网速失速
    this._at.addEventListener('stalled', () => {
      this._setState('stalled')
    })
  }
  //设置音频播放列表
  setLessonId(lessonId) {
    this._currLessonId = lessonId
    this._play(lessonId)
  }

  //播放状态监听
  addStateListener(_listener) {
    this._stateListeners.push(_listener)
  }

  //添加时间进度监听
  addTimeListener(_listener) {
    this._timeListeners.push(_listener)
  }

  //播放状态监听
  removeStateListener(_listener) {
    this._stateListeners.splice(this._stateListeners.indexOf(_listener), 1)
  }

  //移除进度监听
  removeTimeListener(_listener) {
    this._timeListeners.splice(this._timeListeners.indexOf(_listener), 1)
  }
  //0.此元素未初始化  1.正常但没有使用网络  2.正在下载数据  3.没有找到资源
  getNetworkState() {
    return this._at.networkState
  }
  //播放/暂停
  play(audioUrl) {
    // this._play()
    console.log(audioUrl)
    this._at.src = audioUrl
    this._play()
  }
  //切换音频
  change(audioId) {
    if (this._hasLessonId(audioId)) {
      this._play(audioId)
    } else {
      _
    }
  }
  //上一首
  previous(_callback) {
    let audioId = this._audio.preLessonId
    if (!_util.isRealNum(audioId) || audioId < 0) {
      if (this._hasFailure(_callback)) {
        _callback.failure('已是第一个！')
      }
      return
    }
    this._setState('previous')
    if (this._hasSuccess(_callback)) _callback.success()
    this._play(audioId)
  }
  //下一首
  next(_callback) {
    let audioId = this._audio.nextLessonId
    if (!_util.isRealNum(audioId) || audioId < 0) {
      if (this._hasFailure(_callback)) _callback.failure('已是最后一个')
      return
    }
    this._setState('next')
    if (this._hasSuccess(_callback)) _callback.success()
    this._play(audioId)
  }
  //快进
  forward(_callback) {
    var time = this._hasSeekTime(_callback)
    if (this.isPlaying()) {
      let start = this.getProgress() + time
      start = start > this.getDuration() ? this.getDuration() : start
      this._am.seek(start)
    }
  }
  //快退
  fastback(_callback) {
    var time = this._hasSeekTime(_callback)
    if (this.isPlaying()) {
      let start = this.getProgress() - time
      start = start <= 0 ? 0 : start
      this._am.seek(start)
    }
  }
  //获取当前课节音频信息
  getLessonAudio() {
    return this._audio
  }
  //更新当前课节对象
  setLessonAudio(audio) {
    this._audio = audio
  }
  //更新课节音频数据
  updateAudio(audioId) {
    return this._loadData(audioId)
  }
  //获取当前课节Id
  getId() {
    return this._audio.id
  }
  //播放模式   order：顺序播放  random：随机播放  single:单个播放
  setPlayMode(mode) {
    this._mode = mode
  }
  //当前播放状态  默认:'default', 播放:'play', 暂停:'pause', 停止:'stop', 结束:'end', 加载:'loading'
  getState() {
    return this._state
  }
  // 是否正在播放
  isPlaying() {
    return !this._at.paused
  }
  // 判断一个音频是不是正在播放的音频
  isCurrentId(audioId) {
    return audioId && audioId === this.getId()
  }
  //获取暂停的时间
  getProgress() {
    return this._at.currentTime
  }
  //获取当前音频时长
  getDuration() {
    return this._at.duration <= 0 ? this._at.totalTime : this._at.duration
  }
  //播放拖动某位置
  seekTo(value) {
    this._at.fastSeek = value
    console.log(value)
    this._at.currentTime = value
  }
  //停止
  stop() {
    if (this.isPlaying()) {
      this._at.stop()
    } else {
      this._setState('stop')
    }
  }
  //暂停
  pause() {
    this._at.pause()
  }
  //清除进度上传定时器
  _clearInter() {
    if (this._undefined(this._interval)) clearInterval(this.interval)
  }
  //定时上传播放进度
  _uploadProgress() {
    // self._postProgress({ lessonId: id, time: this.getProgress() })
  }
  //上传播放进度
  _postProgress(data) {
    _network.POST(UPLOAD_URL, {
      params: {
        lessonId: data.lessonId,
        listenTime: data.time
      },
      success: res => {
        console.log('time:' + data.time + ' id:' + data.lessonId)
      },
      fail: msg => {
        console.log('上传播放时间失败:' + msg)
      }
    })
  }
  //通过课节ID从服务器获取音频相关数据
  _loadData(_lessonId) {
    this._setState('loading')
    _request
    return new Promise((resolve, reject) => {
      _network.GET(AUDIO_URL, {
        params: {
          lessonId: _lessonId
        },
        success: res => resolve(res),
        fail: msg => reject(msg)
      })
    }).then(
      res => {
        this._setState('success', res.data)
        this._audio = res.data.data
        return res.data.data
      },
      msg => {
        let errCode = msg === '您还未购买该专栏' ? 1201 : -1
        this._setState('failure', {
          code: errCode,
          error: msg
        })
        this.pause()
      }
    )
  }
  //加载音频数据
  _play(_lessonId) {
    this._at.play()
    // this._loadData(_lessonId)
    //   .then(audio => {
    //     if (this._undefined(audio)) return
    //     //暂停正在播放音频
    //     // if (!this._am.paused) this._am.stop()
    //     let learnTime = _util.isRealNum(audio.learnTime) ? parseInt(audio.learnTime) : 0
    //     let totalTime = _util.isRealNum(audio.totalTime) ? parseInt(audio.totalTime) : 0
    //     this._currTime = learnTime >= totalTime - 1 ? 0 : learnTime
    //     //检查网络
    //     this._checkNetworkType({
    //       confirm: () => { this._setAudio(audio) },
    //       cancel: () => { }
    //     })
    //   })
  }
  //设置音频数据
  _setAudio(audio) {
    if (this._undefined(audio) || this._undefined(audio.audioUrl)) {
      this._setState('error', {
        code: -1,
        error: '暂无播放内容'
      })
      return
    }
    this._am.src = audio.audioUrl
    this._am.seek(this._currTime)
    this._am.title = audio.title
    // this._am.epname = audio.title
    // this._am.singer = audio.title
    this._am.coverImgUrl = audio.coverPic
    this._audio = audio
  }
  //设置状态
  _setState(_state, res) {
    this._state = _state
    if (!this._undefined(res)) {
      this._stateListeners.map(_listener => {
        _listener(this._state, res)
      })
    }
    //如果当前音频地址与正在播放的地址不一致(播放错乱或其他小程序正在播放)
    else {
      this._stateListeners.map(_listener => {
        _listener(this._state)
      })
    }
    this._updateProgress(this._state)
  }
  //更新进度
  _updateProgress(state) {
    if (this._undefined(this._interval)) clearInterval(this.interval)
    switch (state) {
      case 'stop':
      case 'pause':
      case 'end':
      case 'next':
      case 'previous':
        this._uploadProgress(this, {
          lessonId: this.getId(),
          time: parseInt(this._at.currentTime)
        })
        break
      case 'play':
        this.interval = setInterval(this._uploadProgress, 5000, this)
        break
    }
  }
  //为定义对象判断
  _undefined(o) {
    return (
      typeof o == 'undefined' || 'undefined' == o || null == o || 'null' == o
    )
  }
}