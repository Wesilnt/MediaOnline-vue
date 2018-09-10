import { getVideoLessonDetail,getLessonListByCourse } from '../../services/columns.js'
import { getCommentList } from '../../services/comment.js'

const videoCourseDetail = {
    namespaced: true, // 设置命名空间 ，保持数据独立性
    state: {
        lessonList : [],              //目录课程
        coverPic:'',              //视频背景图
        audioUrl:'',              //音频地址
        videoUrl:'',              //视频地址
        courseId:0,               //专栏ID
        singleComments:[]         //单集评论数组
    },
    mutations: {
        bindVideoCourseDetail(state,payload) {
            state.coverPic = payload.coverPic
            state.audioUrl = payload.audioUrl
            state.videoUrl = payload.videoUrl
            state.courseId = payload.courseId
        },
        bindAllCourse(state,payload) {
            state.lessonList = payload.result
        },
        bindCommentList(state,payload) {
            state.singleComments = payload.result
        }

    },
    actions:{
       async getVideoCourseDetail ({ commit },{ lessonId }) {            
            //获取视频列表数据
            const result = await getVideoLessonDetail({ lessonId })
            console.log('视频课程详情接口')
            console.log(result)
            commit('bindVideoCourseDetail',result)
        },

        async getLessonListByCourse ( { commit}, { courseId, currentPage, pageSize}) {
            //获取目录课程数据
            console.log('courseId')
            console.log(courseId)
            const result = await getLessonListByCourse({ courseId, currentPage, pageSize })
            console.log('目录课程数据:')
            console.log(result)
            commit('bindVideoCourseDetail',result)
        },

        async getCommentList ({commit},{ regionType, regionId, commentId, currentPage, pageSize}) {
            const result = await getCommentList({regionType, regionId, commentId, currentPage, pageSize})
            console.log('视频专栏留言数据:')
            console.log(result)
            commit('bindCommentList',result)
        }
    }
}
export default videoCourseDetail;