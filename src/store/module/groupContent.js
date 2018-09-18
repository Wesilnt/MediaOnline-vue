import { getCommentList,likeComment } from '../../services/comment.js'
const groupContent = {
    namespaced: true,
    state:{
        videoColumnComments:[],//视频专栏留言数组
    },
    getters:{
        description(state,getters,{ videoColumnDetail }) {
            return  videoColumnDetail.description
        },
        lessonCount(state,getters,{ videoColumnDetail }) {
            return videoColumnDetail.lessonCount
        },
        outlinePic(state,getters,{videoColumnDetail }) {
            return videoColumnDetail.outlinePic
        },
        buyIntro(state,getters,{videoColumnDetail }){
            return videoColumnDetail.buyIntro
        },
        commentCount(state,getters,{videoColumnDetail }){
            return videoColumnDetail.commentCount
        },
        buyCount(state,getters,{videoColumnDetail }){
            return videoColumnDetail.buyCount
        },
        freeLessonList(state,getters,{videoColumnDetail }){
            return videoColumnDetail.freeLessonList
        },
        commentsList(state,getters,{videoColumnDetail }){
            return state.videoColumnComments
        },
        courseId(state,getters,{videoColumnDetail }) {
            return videoColumnDetail.courseId
        }
    },
    mutations:{
        bindCommentList(state,payload) {
            state.videoColumnComments = payload.result
        },
        //更新播放列表是否点赞字段
        updateUserCommentLikeId(state,payload) {
            state.videoColumnComments.forEach(element => {
                if(element.id == payload){
                    element.userCommentLikeId = '1'
                }
            });
        }
    },
    actions:{
        async getCommentList ({commit},params) {
            const result = await getCommentList(params)
            console.log('视频专栏留言数据:')
            console.log(result)
            commit('bindCommentList',result)
        },
        async likeComment ({commit,state},commentId) {

           const result = await likeComment({'commentId':commentId})
           console.log('点赞结果')
           console.log(result)
           if(!result) return
           commit('updateUserCommentLikeId',result.commentId)
  
        }
    }
}

export default groupContent