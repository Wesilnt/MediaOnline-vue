import { getVideoLessonDetail,getLessonListByCourse,doFavorite,unFavorite,lessonListenForVedio } from '../../services/columns.js'
import { getCommentList } from '../../services/comment.js'

const videoCourseDetail = {
    namespaced: true, // 设置命名空间 ，保持数据独立性
    state: {
        //单集详情接口
        radioShowPic:'',              //视频背景图
        vedioShowPic:'',
        audioUrl:'',              //音频地址
        videoUrl:'',              //视频地址
        courseId:0,               //专栏ID
        isFree:0,
        isLike:0,
        createTime:'',
        description:'',           //笔记
        learnTime:0,               //上次播放位置
        learnTotalTime:0,          //累计播放时长 
        questionBOList:[],        //自测题列表
        //所有单集接口
        lessonList : [],              //目录课程
        //评论接口
        singleComments:[],         //单集评论数组
        isAchieveCollect:false,           //是否收藏成功
        collectionId:0
    
    },
    mutations: {
        bindVideoCourseDetail(state,payload) {
            state.radioShowPic = payload.radioShowPic
            state.audioUrl = payload.audioUrl
            state.videoUrl = payload.videoUrl
            state.courseId = payload.courseId
            state.isFree = payload.isFree
            state.isLike = payload.isLike
            state.createTime = payload.createTime
            state.description = payload.description
            state.questionBOList = payload.questionBOList
        },
        bindAllCourse(state,payload) {
            state.lessonList = payload.result
        },
        bindCommentList(state,payload) {
            state.singleComments = payload.result
        },
        //完成收藏
        bindCollection(state,payload) {
            state.isLike = 1
            state.collectionId = payload.id
        },
        //取消收藏
        deleteCollection(state) {
            state.isLike = 0
        },

        //提交播放数据
        submitVideoPlayData(state){

        }

    },
    actions:{
       async getVideoCourseDetail ({ commit },{ lessonId }) {            
            //获取视频列表数据
            const result = await getVideoLessonDetail({ lessonId })
            console.log('视频单集详情接口')
            console.log(result)
            commit('bindVideoCourseDetail',result)

            //在这里



        },

        async getLessonListByCourse ( { commit}, { courseId, currentPage, pageSize}) {
            //获取目录课程数据
            const result = await getLessonListByCourse({ courseId, currentPage, pageSize })
            commit('bindAllCourse',result)
        },

        async getCommentList ({commit},{ regionType, regionId, commentId, currentPage, pageSize}) {
            const result = await getCommentList({regionType, regionId, commentId, currentPage, pageSize})
            commit('bindCommentList',result)
        },

        async doCollectFavorite({commit},lessonId) {
            const result = await doFavorite({"lessonId" : lessonId})
            commit('bindCollection',result)
        },

        async unCollectFavorite({commit},collectionId) {
            const result = await unFavorite({"lessonId" : collectionId})
            commit('deleteCollection')
        },

        async lessonListenForVedio({commit},{ payload }) {
            const result = await lessonListenForVedio({'lessonId' : payload.lessonId, 'listenTime' : payload.listenTime, 'showTime' : payload.showTime})
            console.log("提交视频播放数据成功")
            console.log(result)
            commit('submitVideoPlayData')
        }
    }
}
export default videoCourseDetail;