import {
  getVideoLessonDetail,
  getLessonListByCourse,
  doFavorite,
  unFavorite,
  lessonListenForVedio
} from '../../api/columnsApi.js'
import { getCommentList, postComment } from '../../api/commentApi.js'
import questionListData from './questionListData'
import commentData from './commentData'
import router from '../../router/router'
import { Toast } from 'vant'
const videoCourseDetailData = {
  namespaced: true,
  state: {
    loading: true,
    //单集详情接口
    coverPic: '', //视频背景图
    vedioShowPic: '',
    audioUrl: '', //音频地址
    videoUrl: '', //视频地址
    courseId: 0, //专栏ID
    id: 0, //单集ID
    isFree: 0,
    isLike: 0,
    createTime: '',
    totalTime: 0, //服务器返回的视频总长度
    subTitle: '', //笔记
    learnTime: 0, //上次播放位置
    learnTotalTime: 0, //累计播放时长
    questionBOList: [], //自测题列表
    title: '', //标题
    grade: '', //称号
    //所有单集接口
    lessonList: [], //目录课程
    //评论接口
    singleComments: [], //单集评论数组
    isAchieveCollect: false, //是否收藏成功
    collectionId: 0,
    //自测题
    quesNum: 0, //自测题个数
    rightNum: 0, //自测题答对个数
    rankNum: 3, //自测题排行
    deblockQuestion: false, //是否解锁自测题
    progress: 0, //自测题进度
    activeID: '' //当前选中单集ID
  },
  getters: {
    haveQuestionBOList: state => {
      return state.questionBOList.length > 0
    }
  },
  mutations: {
    resetLoading(state, loading) {
      state.loading = loading
    },
    bindVideoCourseDetail(state, payload) {
      state.coverPic = payload.coverPic
      state.audioUrl = payload.audioUrl
      state.videoUrl = payload.videoUrl
      state.courseId = payload.courseId
      state.id = payload.id
      state.isFree = payload.isFree
      state.isLike = payload.isLike
      state.totalTime = payload.totalTime
      state.createTime = payload.createTime
      state.subTitle = payload.subTitle
      state.title = payload.title
      state.questionBOList = payload.questionBOList
      state.grade = payload.grade
      state.learnTotalTime = payload.learnTotalTime
      state.learnTime = payload.learnTime
    },
    bindActiveId(state, lessonId) {
      state.activeID = lessonId
    },
    bindQuestionBymyself(state, { deblockQuestion, progress }) {
      state.deblockQuestion = deblockQuestion
      state.progress = progress
    },
    bindAllCourse(state, payload) {
      state.lessonList = payload.result
    },
    bindCommentList(state, payload) {
      state.singleComments = payload.result
    },
    //完成收藏
    bindCollection(state, payload) {
      state.isLike = 1
      state.collectionId = payload.id
    },
    //取消收藏
    deleteCollection(state) {
      state.isLike = 0
    },
    //提交播放数据
    submitVideoPlayData(state) {}
  },
  actions: {
    updateVideoPlayData({ dispatch, state }, lessonId) {
      let storage = window.localStorage
      //根据单集ID来存储视频播放数据对象
      let videoData = JSON.parse(storage.getItem(lessonId))
      // console.log('------------- videoData.playTotalTime',videoData.historyPlayPosition)
      // console.log(videoData)
      //服务器数据
      let servicePlayTotalTime = state.learnTotalTime || 0
      let servicePlayPosition = state.learnTime
      if (videoData != null) {
        /*
          更新播放数据到服务器的逻辑:在请求单集详情接口(getVideoCourseDetail)时,将本地记录的播放记录更新到服务器.
          这里为什么不在vue实例的生命周期函数beforeDestroy里上传播放进度到服务器,是因为监听不到公众号页面左上角叉号的回调逻辑
          上传进度的逻辑也分为2种情况:
          一:如果本地累计观看时长大于服务器存储的播放时长,就将本地的数据上传到服务器
          二:如果本地累计观看时长小于服务器存储的播放时长,就将服务器的数据拉下来并同步到本地
        */
        //  console.log(videoData)
        let loaclPlayTotalTime = Math.round(videoData.playTotalTime) || 0
        let loaclPlayPosition = Math.round(videoData.historyPlayPosition)
        // console.log('videoData = ',loaclPlayTotalTime,loaclPlayPosition)
        if (
          loaclPlayTotalTime > servicePlayTotalTime &&
          loaclPlayPosition > 0
        ) {
          let payload = {
            lessonId: lessonId,
            listenTime: loaclPlayPosition, //播放位置
            showTime: loaclPlayTotalTime //累计时长
          }
          // console.log('更新服务器数据 payload = ')
          // console.log(payload)
          //如果本地累计播放时长大于服务器记录的,就用本地的记录更新服务器的记录
          dispatch('lessonListenForVedio', payload)
        } else {
          //如果本地时长小与服务器的记录(比如换手机,微信清缓存等异常情况),用服务器记录去更新我本地的播放记录
          let obj = {
            playTotalTime: servicePlayTotalTime,
            historyPlayPosition: servicePlayPosition
          }
          obj = JSON.stringify(obj)
          // console.log('更新storge')
          storage.setItem(lessonId, obj)
        }
        // console.log('服务器数据更新本地数据')
        videoData = JSON.parse(storage.getItem(lessonId))
        // console.log('新的videodata =')
        // console.log(videoData)
        dispatch('updateQuestionData', lessonId)
      } else {
        /*
          这里有2种情况:
          一:用户点开一个全新的专栏单集视频,本地数据和服务器数据都为空
          二:用户微信清空了缓存或者用户换了手机,此时本地数据为空,但服务器数据不为空
          综上:不做处理,如果本地为空,统一将服务器的数据同步到本地
        */
        let obj = {
          playTotalTime: servicePlayTotalTime,
          historyPlayPosition: servicePlayPosition
        }
        obj = JSON.stringify(obj)
        storage.setItem(lessonId, obj)
        dispatch('updateQuestionData', lessonId)
      }
    },
    //更新自测题数据
    updateQuestionData({ state, commit }, lessonId) {
      /*
      自测题逻辑分为2种情况:
      一:进入单集详情页,没有播放视频.用本地记录的视频播放数据计算是否显示自测题(deblockQuestion)和播放进度(progress),具体的显示逻辑放在了答题组件里面做判断
      二:开始播放视频,在监听视频播放的回调方法里,用实时返回视频播放数据计算deblockQuestion和progress两个值,并更新vuex里保存的值
      */
      let progress = 0
      let deblockQuestion = false
      let videoData = JSON.parse(window.localStorage.getItem(lessonId))
      const percent = (videoData.playTotalTime / state.totalTime) * 100
      progress = percent <= 100 ? percent : 100
      if (
        !deblockQuestion &&
        Math.round(videoData.playTotalTime) >= Math.round(state.totalTime * 0.7)
      ) {
        deblockQuestion = true
      }
      // console.log('初始状态下的deblockQuestion ===',deblockQuestion,lessonId)
      // console.log('初始状态的progress ===',progress,lessonId)
      commit('bindQuestionBymyself', { progress, deblockQuestion })
    },
    //获取单集详情
    async getVideoCourseDetail({ commit, dispatch, state }, { lessonId }) {
      const result = await getVideoLessonDetail({ lessonId })
      console.log('视频单集详情接口')
      console.log('result = ', result)
      if (!result) return
      await commit('resetLoading', true)
      //绑定单集详情内容
      commit('bindVideoCourseDetail', result)
      //绑定目录列表哪一个单集处于播放状态
      commit('bindActiveId', lessonId)
      //刷新路由参数里的单集ID
      router.push({ name: 'videoCourseDetail', params: { lessonId } })
      //获取专栏单集目录列表数据
      let params = {
        courseId: result.courseId,
        currentPage: 1,
        pageSize: 10
      }
      await dispatch('getLessonListByCourse', params)
      //获取单集评论
      const commentParams = {
        regionType: 2202,
        regionId: lessonId,
        currentPage: 1,
        pageSize: 11
      }
      await dispatch('getCommentList', commentParams)
      //更新当前播放视频的播放数据
      await dispatch('updateVideoPlayData', lessonId)
      await commit('resetLoading', false)
    },

    async getLessonListByCourse({ commit }, params) {
      //获取目录课程数据
      const result = await getLessonListByCourse(params)
      console.log('获取目录课程数据')
      console.log(result)
      if (result == null) return
      commit('bindAllCourse', result)
    },

    async getCommentList(
      { commit },
      { regionType, regionId, commentId, currentPage = 1, pageSize = 11 }
    ) {
      const result = await getCommentList({
        regionType,
        regionId,
        commentId,
        currentPage,
        pageSize
      })
      if (result == null) return
      commit('bindCommentList', result)
    },

    async doCollectFavorite({ commit }, lessonId) {
      const result = await doFavorite({ lessonId: lessonId })
      commit('bindCollection', result)
    },
    async unCollectFavorite({ commit }, collectionId) {
      const result = await unFavorite({ lessonId: collectionId })
      commit('deleteCollection')
    },

    async lessonListenForVedio({ commit }, { lessonId, listenTime, showTime }) {
      const result = await lessonListenForVedio({
        lessonId,
        listenTime,
        showTime
      })
      commit('submitVideoPlayData')
    },

    //发布评论
    async postComment({ state, commit, dispatch }, params) {
      dispatch('commentData/postComment', params)
      // const res = await postComment(params)
      // if (!res) {
      //   return Toast('评论失败')
      // }
      // Toast('评论成功')
      // dispatch('getCommentList', params)
    }
  },

  modules: {
    questionListData,
    commentData
  }
}
export default videoCourseDetailData
