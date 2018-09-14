import {
  getCommentList,
  postComment,
  likeComment
} from '../../services/commentApi'

export default {
  namespaced: true,
  state: {
    commentList: [],
    currentPage: 1,
    pageSize:10,
    finished:false, 
    loading:false
  },
  mutations: {
    setLessonId(state, lessonId) {
      state.lessonId = lessonId;
    },
    setCommentList(state, res) { 
      console.log(res)
      state.currentPage = res.page
      state.finished = res.list.length<state.pageSize 
      state.loading = false
      if(1==res.page)state.commentList=[]  
      res.list.forEach(element => {
        state.commentList.push(element)
      });
      // state.commentList = state.commentList.concat(res.list)
    },
    postComment(state, res) {},
    //更新播放列表是否点赞字段
    updateUserCommentLikeId(state, payload) {
      state.commentList.some(element => {
        if (element.id == payload) {
          element.userCommentLikeId = '1'
          element.likeCount = element.likeCount+1
          return
        }
      });
    },
    toggleLoading(state,params){
        state.loading = params.loading
    }
  },
  actions: {
    //获取评论列表
    async getCommentList({state, commit}, {lessonId,isLoadMore}) {
      await commit('toggleLoading', {loading: true})
      let page = isLoadMore ? state.currentPage + 1 : 1 
      let res = await getCommentList({
        regionType: 2202, //留言位置（2201:专栏,2202:单集)
        regionId: lessonId, //位置id
        currentPage: page, //当前页码
        pageSize: state.pageSize //每页显示条数
      })   
      if(null==res.result)return
      commit('setCommentList', {list:res.result,page:page})
    },
    //发布评论
    async postComment({ state,commit,dispatch}, params) {
      const res = await postComment(params)
      console.log(res)
      commit("postComment", res)
      dispatch('getCommentList', {lessonId:params.regionId,isLoadMore:false})
    },
    async likeComment({commit,state}, commentId) {
      const result = await likeComment({'commentId': commentId})
      if (!result) return
      commit('updateUserCommentLikeId', result.commentId)

    }
  }
}