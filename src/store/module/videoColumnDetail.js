import { getVideoColumnDetail } from '../../services/columns.js'

import groupContent from './groupContent'

const videoColumnDetail = {
    namespaced: true, // 设置命名空间 ，保持数据独立性
    state: {
        freeLessonList : [],              //试看课程数组
        profilePic:'',                 //头图
        description:'',           //专栏介绍
        outlinePic:'',           //课程列表下面的大图展示
        // videoColumnComments:[],       //视频专栏的留言
        buyIntro:'',               //购买须知
        lessonCount:0,                 //专栏课集总数
        commentCount:0,              //留言条数
        buyCount:0,             //购买数量 
        courseId:0,              //专栏ID 
        collectLikeId:0,        //集赞ID 
    },
    getters: {

    },
    mutations: {
        initDatas(state,courseId) {
            state.courseId = courseId
        },
        bindVideoColumnDetail(state,payload) {
            state.freeLessonList = payload.freeLessonList
            state.profilePic = payload.profilePic
            state.description = payload.description
            state.outlinePic = payload.outlinePic
            state.buyIntro = payload.buyIntro
            state.lessonCount = payload.lessonCount
            state.commentCount = payload.commentCount
            state.buyCount = payload.buyCount 
            state.collectLikeId = payload.collectLikeId
        },
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
       async getVideoColumnDetail ({ commit },{ courseId }) {            
            //获取视频列表数据
            // console.log('courseID =' + courseId)
            const result = await getVideoColumnDetail({ courseId })
            // console.log('视频专栏接口数据:')
            // console.log(result)
            commit('bindVideoColumnDetail',result)
        }

    },
    modules:{
        groupContent
    }
}
export default videoColumnDetail;