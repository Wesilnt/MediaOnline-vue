import { getCommentList, likeComment } from '../../api/commentApi.js'
const groupContentData = {
  namespaced: true,
  state: {
    videoColumnComments: [], //视频专栏留言数组
    commentsTotalCount:0//精选留言总数
  },
  getters: {
    description(state, getters, { videoColumnDetailData }) {
      return videoColumnDetailData.description
    },
    lessonCount(state, getters, { videoColumnDetailData }) {
      return videoColumnDetailData.lessonCount
    },
    outlinePic(state, getters, { videoColumnDetailData }) {
      return videoColumnDetailData.outlinePic
    },
    buyIntro(state, getters, { videoColumnDetailData }) {
      return videoColumnDetailData.buyIntro
    },
    commentCount(state, getters, { videoColumnDetailData }) {
      return videoColumnDetailData.commentCount
    },
    buyCount(state, getters, { videoColumnDetailData }) {
      return videoColumnDetailData.buyCount
    },
    freeLessonList(state, getters, { videoColumnDetailData }) {
      return videoColumnDetailData.freeLessonList
    },
    courseId(state, getters, { videoColumnDetailData }) {
      return videoColumnDetailData.courseId
    }
  },
  mutations: {
    bindCommentList(state, payload) {
      state.videoColumnComments = payload.result
      state.commentsTotalCount = payload.totalCount
    },
    //更新播放列表是否点赞字段
    updateUserCommentLikeId(state, payload) {
      state.videoColumnComments.forEach(element => {
        if (element.id == payload) {
          element.userCommentLikeId = '1'
        }
      })
    }
  },
  actions: {
    async getCommentList({ commit }, params) {
      const result = await getCommentList(params)
      console.log('groupContent视频专栏留言数据:')
      console.log(result)
      commit('bindCommentList', result)
    },
    async likeComment({ commit, state }, commentId) {
      const result = await likeComment({ commentId: commentId })
      console.log('点赞结果')
      console.log(result)
      if (!result) return
      commit('updateUserCommentLikeId', result.commentId)
    }
  }
}

export default groupContentData
