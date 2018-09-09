import { getColumns } from '../../services/columns.js'

const videoCourseDetail = {
    namespaced: true, // 设置命名空间 ，保持数据独立性
    state: {
        lessonList : [],              //目录课程
        originData : null,            //接口返回数据
        videoBgImage:'',              //视频背景图
        videoNote:'',                 //课程笔记
        courseListImage:'',           //课程列表下面的大图展示
        videoCourseComments:[],       //视频课程的留言

    },
    mutations: {
        bindVideoCourseDetail(state,payload) {
            state.originData = payload
            state.lessonList = payload.categoryList[0].lessonList
            state.headImage = payload.profilePic
            state.columnIntroduce = payload.description
            state.courseListImage = payload.outlinePic
            // state.purchaseTip = payload.

        }
    },
    actions:{
       async getVideoCourseDetail ({ commit },{ lessonId }) {            
            //获取视频列表数据
            const result = await getVideolessonDetail({ lessonId })
            console.log(result)
            commit('bindVideoCourseDetail',result)
        }
    }
}
export default videoCourseDetail;