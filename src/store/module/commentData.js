import {
  getCommentList,
  postComment
} from '../../services/commentApi'

export default {
  namespaced:true,
  state: {

  },
  mutations: {
    getCommentList(state,res){

    },
    postComment(state,res){}
  },
  actions: {
    //获取评论列表
    async getCommentList(params) {
      const res = await getCommentList(params)
    },
    //发布评论
    async  postComment(params) {
      const res = await postComment(params)
    }
  }
}