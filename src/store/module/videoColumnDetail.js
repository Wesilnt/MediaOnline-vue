import { getVideoColumnDetail } from '../../services/columns.js'

const videoColumnDetail = {
    namespaced: true, // 设置命名空间 ，保持数据独立性
    state: {
        lessonList : [],              //试看课程数组
        originData : null,            //接口返回数据
        headImage:'',                 //头图
        columnIntroduce:'',           //专栏介绍
        courseListImage:'',           //课程列表下面的大图展示
        videoColumnComments:[],       //视频专栏的留言
        purchaseTip:''                //购买须知

    },
    mutations: {
        bindVideoColumnDetail(state,payload) {
            state.originData = payload
            state.lessonList = payload.freeLessonList
            state.headImage = payload.profilePic
            state.columnIntroduce = payload.description
            state.courseListImage = payload.outlinePic
            state.purchaseTip = payload.buyIntro

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
        }
    }
}
export default videoColumnDetail;