import {
  getVideoLessonDetail,
  getLessonListByCourse,
  doFavorite,
  unFavorite,
  lessonListenForVedio
} from '../../services/columns.js'
import { getCommentList, postComment } from '../../services/comment.js'
import questionList from './questionList'
import router from '../../router/router'
const videoCourseDetail = {
  namespaced: true,
  state: {
    //单集详情接口
    radioShowPic: '', //视频背景图
    vedioShowPic: '',
    audioUrl: '', //音频地址
    videoUrl: '', //视频地址
    courseId: 0, //专栏ID
    id: 0, //单集ID
    isFree: 0,
    isLike: 0,
    createTime: '',
    totalTime: 0, //服务器返回的视频总长度
    description: '', //笔记
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
    bindVideoCourseDetail(state, payload) {
      state.radioShowPic = payload.radioShowPic
      state.audioUrl = payload.audioUrl
      state.videoUrl = payload.videoUrl
      state.courseId = payload.courseId
      state.id = payload.id
      state.isFree = payload.isFree
      state.isLike = payload.isLike
      state.totalTime = payload.totalTime
      state.createTime = payload.createTime
      state.description = payload.description
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
      state.deblockQuestion = deblockQuestion || state.deblockQuestion
      state.progress = progress || state.progress
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
    //更新播放数据
    updateVideoPlayData({ dispatch, state }, lessonId) {
      //在这里判断是否提交本地的视频播放数据
      let storage = window.localStorage
      //根据单集ID来存储视频播放数据对象
      let videoData = JSON.parse(storage.getItem(lessonId))
      //服务器数据
      let servicePlayTotalTime = state.learnTotalTime || 0
      let servicePlayPosition = state.learnTime
      if (videoData != null) {
        //本地数据
        let loaclPlayTotalTime = Math.round(videoData.playTotalTime) || 0
        let loaclPlayPosition = Math.round(videoData.historyPlayPosition)
        // console.log(videoData)
        // console.log('loaclPlayPosition' + loaclPlayPosition)
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
          storage.setItem(lessonId, obj)
        }

        dispatch('updateQuestionData', lessonId)
      } else {
        //第一次本地播放记录为空,更新服务器的记录到本地
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
      //是否显示自测题
      //第一次进入单集详情页面时,答题进度用服务器保存的视频长度
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
      commit('bindQuestionBymyself', { progress, deblockQuestion })
    },
    //获取单集详情
    async getVideoCourseDetail({ commit, dispatch, state }, { lessonId }) {
      //获取视频列表数据
      const result = await getVideoLessonDetail({ lessonId })
      console.log('视频单集详情接口')
      console.log('result = ', result)
      if (result == null) return
      commit('bindVideoCourseDetail', result)
      commit('bindActiveId', lessonId)
      //刷新路由中单集ID
      router.push({ name: 'videoCourseDetail', params: { lessonId } })

      let params = {
        courseId: result.courseId,
        currentPage: 1,
        pageSize: 10
      }
      //获取目录列表数据
      dispatch('getLessonListByCourse', params)
      //获取单集评论
      const commentParams = {
        regionType: 2202,
        regionId: lessonId,
        currentPage: 1,
        pageSize: 11
      }
      dispatch('getCommentList', commentParams)
      //更新视频播放数据
      dispatch('updateVideoPlayData', lessonId)
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
      { regionType, regionId, commentId, currentPage, pageSize }
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
      const res = await postComment(params)
      console.log('发布评论成功')
      console.log(res)
      // commit("postComment", res)
      // dispatch('getCommentList', {lessonId:params.regionId,isLoadMore:false})
    }
  },

  modules: {
    questionList
  }
}
export default videoCourseDetail
