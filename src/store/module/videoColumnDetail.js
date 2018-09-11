import { getVideoColumnDetail } from '../../services/columns.js'
import { getCommentList } from '../../services/comment.js'

const videoColumnDetail = {
    namespaced: true, // 设置命名空间 ，保持数据独立性
    state: {
        freeLessonList : [],              //试看课程数组
        profilePic:'',                 //头图
        description:'',           //专栏介绍
        outlinePic:'',           //课程列表下面的大图展示
        videoColumnComments:[],       //视频专栏的留言
        buyIntro:'',               //购买须知
        lessonCount:0,                 //专栏课集总数
        commentCount:0,              //留言条数
        buyCount:0,             //购买数量
    },
    getters: {

    },
    mutations: {
        bindVideoColumnDetail(state,payload) {
            state.freeLessonList = payload.freeLessonList
            state.profilePic = payload.profilePic
            state.description = payload.description
            state.outlinePic = payload.outlinePic
            state.buyIntro = payload.buyIntro
            state.lessonCount = payload.lessonCount
            state.commentCount = payload.commentCount
            state.buyCount = payload.buyCount
        },
        bindCommentList(state,payload) {
            state.videoColumnComments = payload.result
        }
    },
    actions:{
       async getVideoColumnDetail ({ commit },{ courseId }) {            
            //获取视频列表数据
            // console.log('courseID =' + courseId)
            const result = await getVideoColumnDetail({ courseId })
            console.log('视频专栏接口数据:')
            console.log(result)
            commit('bindVideoColumnDetail',result)
        },
        async getCommentList ({commit},{ regionType, regionId, commentId, currentPage, pageSize}) {
            const result = await getCommentList({regionType, regionId, commentId, currentPage, pageSize})
            console.log('视频专栏留言数据:')
            console.log(result)
            commit('bindCommentList',result)
        }
    }
}
export default videoColumnDetail;