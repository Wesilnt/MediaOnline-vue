import {
  getVideoLessonDetail,
  getLessonListByCourse,
  doFavorite,
  unFavorite,
  lessonListenForVedio
} from '../../services/columns.js'
import { getCommentList, postComment } from '../../services/comment.js'
import questionList from './questionList'

const videoCourseDetail = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
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
    rankNum: 3 //自测题排行
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
      console.log("------ + courseID =", payload.courseId)
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
    bindQuestionBymyself(state, quesNum, rightNum) {
      state.quesNum = quesNum
      state.rightNum = rightNum
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
    async getVideoCourseDetail({ commit, dispatch, state }, { lessonId }) {
      //获取视频列表数据
      const result = await getVideoLessonDetail({ lessonId })
      console.log('视频单集详情接口')
      console.log('result = ', result)
      commit('bindVideoCourseDetail', result)
      //获取目录列表数据
      if (result == null) return
      let params = {
        courseId: result.courseId,
        currentPage: 1,
        pageSize: 10
      }
      dispatch('getLessonListByCourse',params)
      //判断是否已完成答题
      //自测题个数
      const quesNum = result.questionBOList.length
      //自测题答对个数
      let rightNum = 0
      result.questionBOList.forEach(element => {
        if (element.answer == element.rightOpt) {
          rightNum++
        }
      })
      commit('bindQuestionBymyself', quesNum, rightNum)

      //在这里判断是否提交本地的视频播放数据
      let storage = window.localStorage
      //根据单集ID来存储视频播放数据对象
      let videoData = JSON.parse(storage.getItem(result.id))
      //服务器数据
      let servicePlayTotalTime = result.learnTotalTime || 0
      let servicePlayPosition = result.learnTime
      if (videoData != null) {
        //本地数据
        let loaclPlayTotalTime = videoData.playTotalTime || 0
        let loaclPlayPosition = videoData.historyPlayPosition
        console.log(videoData)
        console.log('loaclPlayPosition' + loaclPlayPosition)
        if (loaclPlayTotalTime > servicePlayTotalTime) {
          let payload = {
            lessonId: lessonId,
            listenTime: Math.round(parseFloat(loaclPlayPosition)), //播放位置
            showTime: Math.round(parseFloat(loaclPlayTotalTime)) //累计时长
          }
          // console.log('更新服务器数据 payload = ')
          // console.log(payload)
          //如果本地累计播放时长大于服务器记录的,就用本地的记录更新服务器的记录
          dispatch('lessonListenForVedio', payload).then(() => {
            console.log('更新服务器播放数据成功')
          })
        } else {
          //如果本地时长小与服务器的记录(比如换手机,微信清缓存等异常情况),用服务器记录去更新我本地的播放记录
          let obj = {
            playTotalTime: servicePlayTotalTime,
            historyPlayPosition: servicePlayPosition
          }
          obj = JSON.stringify(obj)
          storage.setItem(result.id, obj)
        }
      } else {
        let obj = {
          playTotalTime: servicePlayTotalTime,
          historyPlayPosition: servicePlayPosition
        }
        obj = JSON.stringify(obj)
        storage.setItem(result.id, obj)
      }
    },

    async getLessonListByCourse({ commit }, params) {
      //获取目录课程数据
      const result = await getLessonListByCourse(params)
      console.log('获取目录课程数据')
      console.log(result)
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

    async lessonListenForVedio({ commit }, payload) {
      const result = await lessonListenForVedio({
        lessonId: payload.lessonId,
        listenTime: payload.listenTime,
        showTime: payload.showTime
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
