import {
  getVideoLessonDetail,
  getLessonListByCourse,
  doFavorite,
  unFavorite,
  lessonListenForVedio
} from '../../services/columns.js'
import { getCommentList } from '../../services/comment.js'
import questionList from './questionList'

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
        totalTime:0,             //服务器返回的视频总长度
        description:'',           //笔记
        learnTime:0,               //上次播放位置
        learnTotalTime:0,          //累计播放时长 
        questionBOList:[],        //自测题列表
        title:'',                   //标题
        grade:'',                 //称号
        //所有单集接口
        lessonList : [],              //目录课程
        //评论接口
        singleComments:[],         //单集评论数组
        isAchieveCollect:false,           //是否收藏成功
        collectionId:0,
        
   
    },
    mutations: {
        bindVideoCourseDetail(state,payload) {
            state.radioShowPic = payload.radioShowPic
            state.audioUrl = payload.audioUrl
            state.videoUrl = payload.videoUrl
            state.courseId = payload.courseId
            state.isFree = payload.isFree
            state.isLike = payload.isLike
            state.totalTime = payload.totalTime
            state.createTime = payload.createTime
            state.description = payload.description
            state.title = payload.title
            state.questionBOList = payload.questionBOList
            state.grade = payload.grade
            state.learnTotalTime = payload.learnTotalTime
            state.learnTime = payload.learnTime
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
       async getVideoCourseDetail ({ commit,dispatch,state },{ lessonId }) {            
            //获取视频列表数据
            const result = await getVideoLessonDetail({ lessonId })
            console.log('视频单集详情接口')
            console.log("result = ",result)
            commit('bindVideoCourseDetail',result)
            if(result == null) return
           
            //在这里判断是否提交本地的视频播放数据
            let storage = window.localStorage;
            let loaclPlayTime = storage.getItem("PlayTotalTime")
            let loaclPlayPosition = storage.getItem("HistoryPlayPosition")
            
            let servicePlayTime = result.learnTotalTime || 0
            let servicePlayPosition = result.learnTime
            console.log('lessonId = ' + lessonId)
            console.log('loaclPlayTime =')
            console.log(loaclPlayTime)
            console.log('loaclPlayPosition = ')
            console.log(loaclPlayPosition)
            console.log('servicePlayTime = ' + servicePlayTime)
            console.log('servicePlayPosition = ' + servicePlayPosition)
            if(loaclPlayTime > servicePlayTime) {
                console.log('11111111111')
                let payload = {
                    'lessonId' : lessonId,
                    'listenTime':Math.round(parseInt(loaclPlayTime)),
                    'showTime' :Math.round(parseInt(loaclPlayPosition))
                }
                console.log('payload = ' )
                console.log(payload)
                //如果本地累计播放时长大于服务器记录的,就用本地的记录更新服务器的记录
                dispatch('lessonListenForVedio',payload).then(()=>{
                        console.log('更新服务器播放数据成功')
                    }
                )
            }else{
                console.log('222222222222')
                //如果本地时长小与服务器的记录(比如换手机,微信清缓存等异常情况),用服务器记录去更新我本地的播放记录
                storage.setItem("PlayTotalTime",servicePlayTime)
                storage.setItem("HistoryPlayPosition",servicePlayPosition)
            }
        },

    async getLessonListByCourse(
      { commit },
      { courseId, currentPage, pageSize }
    ) {
      //获取目录课程数据
      const result = await getLessonListByCourse({
        courseId,
        currentPage,
        pageSize
      })
      commit('bindAllCourse', result)
    },

    async getCommentList(
      { commit },
      { regionType, regionId, commentId, currentPage, pageSize }
    ) {
      const result = await getCommentList({
        regionType,
        regionId,
        commentId,
        currentPage,
        pageSize
      })
      commit('bindCommentList', result)
    },

    async doCollectFavorite({ commit }, lessonId) {
      const result = await doFavorite({ lessonId: lessonId })
      commit('bindCollection', result)
    },

    async unCollectFavorite({ commit }, collectionId) {
      const result = await unFavorite({ lessonId: collectionId })
      commit('deleteCollection')
    },

        async lessonListenForVedio({commit},payload) {
            const result = await lessonListenForVedio({'lessonId' : payload.lessonId, 'listenTime' : payload.listenTime, 'showTime' : payload.showTime})
            console.log("提交视频播放数据成功")
            console.log(result)
            commit('submitVideoPlayData')
        }
    },

    modules:{
        questionList
    }
}
export default videoCourseDetail
