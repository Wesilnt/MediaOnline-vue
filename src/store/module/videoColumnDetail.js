import { getVideoColumnDetail } from '../../services/columns.js'

import groupContent from './groupContent'
import groupManager from './groupManager'

const videoColumnDetail = {
    namespaced: true,
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
        // userAccessStatus:0,      //订单状态
        // //集赞
        // praiseData:{},         //集赞数据        
        // //拼团
        // groupData:{},          //拼团数据
        // isShowGroupBuy:false,             //是否显示拼团购买  

    },
    getters: {

    },
    mutations: {
        initDatas(state,courseId) {
            state.courseId = courseId
        },
        bindVideoColumnDetail(state,result) {
            state.freeLessonList = result.freeLessonList
            state.profilePic = result.profilePic
            state.description = result.description
            state.outlinePic = result.outlinePic
            state.buyIntro = result.buyIntro
            state.lessonCount = result.lessonCount
            state.commentCount = result.commentCount
            state.buyCount = result.buyCount
        }


    },
    actions:{
        async getVideoColumnDetail ({ commit,dispatch },{ courseId,groupBuyId }) {            
            //获取视频专栏数据
            const result = await getVideoColumnDetail({ courseId })
            console.log('视频专栏接口数据:')
            console.log(result)

            commit('bindVideoColumnDetail',result)

            const toolsData = {
                "collectLikeDuration" : result.collectLikeDuration,
                "collectLikeId" : result.collectLikeId,
                "collectLikePersonCount" : result.collectLikePersonCount,
                "collectLikeTemplateId" : result.collectLikeTemplateId,
                "groupBuyDuration" : result.groupBuyDuration,
                "groupBuyPersonCount" : result.groupBuyPersonCount,
                "groupBuyPrice" : result.groupBuyPrice,
                "groupBuyId": groupBuyId || result.groupBuyId,
                "groupBuyTemplateId" : result.groupBuyTemplateId,
                "userAccessStatus" : result.userAccessStatus
            }

            dispatch('groupManager/initToolsBar',toolsData)
        }

    },
    modules:{
        groupContent,
        groupManager
    }
}
export default videoColumnDetail;
