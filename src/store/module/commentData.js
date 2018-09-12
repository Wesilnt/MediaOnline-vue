import {
  getCommentList,
  postComment
} from '../../services/commentApi'

export default {
  namespaced:true,
  state: {
      commentList:[],
      lessonId:-1,
      currentPage:1,
  },
  mutations: {
    setLessonId(state,lessonId){
      state.lessonId = lessonId;
    },
    setCommentList(state,res){
       state.commentList = res
    },
    postComment(state,res){}
  },
  actions: {
    //获取评论列表
    async getCommentList({state,commit},isLoadmore) {
       state.currentPage = isLoadmore? state.currentPage+1 : 1
      let res = await getCommentList({
        regionType: 2202,                               //留言位置（2201:专栏,2202:单集)
        regionId: state.lessonId,                       //位置id
        currentPage: state.currentPage,                 //当前页码
        pageSize: 20                                    //每页显示条数
      })
      console.log(res)
      commit('setCommentList', res.result)
    },
    //发布评论
    async postComment({state,commit,dispatch},params) {
      const res = await postComment(params)
      console.log(res)
      commit("postComment",res)
      dispatch('getCommentList',false)
    }
  }
}