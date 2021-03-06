import {
  getCommentList,
  postComment,
  likeComment
} from '../../api/commentApi'

export default {
  namespaced: true,
  state: {
    commentList: [],
    currentPage: 1,
    pageSize: 20,
    finished: false,
    loading: false
  },
  mutations: {
    setLessonId(state, lessonId) {
      state.lessonId = lessonId
    },
    setCommentList(state, res) {
      state.currentPage = res.currentPage
      state.finished = res.list.length < state.pageSize
      state.loading = false 
      if (1 == res.currentPage) state.commentList = []
      state.commentList = state.commentList.concat(res.list)
    },
    postComment(state, res) {},
    //更新播放列表是否点赞字段
    updateUserCommentLikeId(state, payload) {
      console.log("commentList",state.commentList)
      state.commentList.map(element => {
        if (element.id == payload) {
          element.userCommentLikeId = '1'
          element.likeCount = element.likeCount + 1
          return
        }
      })
    },
    toggleLoading(state, params) {
      state.loading = params.loading
    }
  },
  actions: {
    //获取评论列表
    async getCommentList({ state, commit },{ regionId, regionType, isLoadMore }) {
      await commit('toggleLoading', { loading: true })
      let currentPage = isLoadMore ? state.currentPage + 1 : 1
      let params = {
        regionType: regionType || 2202,
        regionId,
        currentPage,
        pageSize: state.pageSize
      }
      let res = await getCommentList(params)
      if (!res.result) return
      commit('setCommentList', { list: res.result, currentPage })
    },
    //发布评论
    async postComment({ state, commit, dispatch }, params) {
      const res = await postComment(params)
      if (null == res) return
      dispatch('getCommentList', {regionId: params.regionId, regionType: 2202,isLoadMore: false})
    },
    async likeComment({ commit, state }, commentId) {
      const result = await likeComment({ commentId: commentId })
      if (!result) return
      commit('updateUserCommentLikeId', result.commentId)
    }
  }
}
