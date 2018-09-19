import { getVideoColumnDetail } from '../../services/columns.js'

import groupContent from './groupContent'
import groupManager from './groupManager'

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
        groupData:null,          //拼团数据
        praiseData:null,         //集赞数据
        headerType:0,          //100倒计时 101拼团成功  102拼团失败  103拼团已满
        isShowGroupBuy:false,             //是否显示拼团购买   
    },
    getters: {

    },
    mutations: {
        initDatas(state,courseId) {
            state.courseId = courseId
        },
        bindVideoColumnDetail(state,{result,praiseData,groupData}) {
            state.freeLessonList = result.freeLessonList
            state.profilePic = result.profilePic
            state.description = result.description
            state.outlinePic = result.outlinePic
            state.buyIntro = result.buyIntro
            state.lessonCount = result.lessonCount
            state.commentCount = result.commentCount
            state.buyCount = result.buyCount
            state.groupData = groupData
            state.praiseData = praiseData
        }

    },
    actions:{
       async getVideoColumnDetail ({ commit,state },{ courseId }) {            
            //获取视频列表数据
            // console.log('courseID =' + courseId)
            const result = await getVideoColumnDetail({ courseId })
            console.log('视频专栏接口数据:')
            console.log(result)

            const praiseData = {
                "collectLikeDuration" : result.collectLikeDuration || 0,
                "collectLikeId" : result.collectLikeId || "",
                "collectLikePersonCount" : result.collectLikePersonCount || 0,
                "collectLikeTemplateId" : result.collectLikeTemplateId || ""
            }

            const groupData = {
                "groupBuyDuration" : result.groupBuyDuration || 0,
                "groupBuyPersonCount" : result.groupBuyPersonCount || 0,
                "groupBuyPrice" : result.groupBuyPrice || 0,
                "groupBuyTemplateId" : result.groupBuyTemplateId || ""
            }


            /*
            工具条显示情况分析
            1.原价购买 拼团购买 集赞换
            2.原价购买
            3.原价购买 拼团购买
            4.原价购买 集赞换
            5.您已发起集赞,请点击前往
            6.已完成集赞,点击领取

            7.立即邀请好友拼团
            8.参与拼团
            9.继续支付
            10.我要开团
            11.我要学习


            头部显示:
            不显示拼团
            倒计时
            拼团成功
            拼团失败
            拼团已满

            //发起人角色
            1. 第一次来到专栏页面 不显示拼团头+标准工具条
            2. 点击原价购买 跳转到单集页面并解锁所有目录课程
            3. 点击拼团购买 显示拼团头 显示倒计时 工具条显示 立即邀请好友拼团
            4. 拼团失败 + 立即邀请好友拼团
            5. 拼团成功 + 立即学习,点击立即学习跳转到单集详情页解锁目录列表

            //参与人角色
            6.点击分享链接进来  显示拼团头 + 参与拼团
            7. 显示用户头像 + 继续支付
            8.拼团成功 + 立即邀请好友拼团
            9.拼团失败 + 立即开团


            */


            commit('bindVideoColumnDetail',{result,praiseData,groupData})
        }

    },
    modules:{
        groupContent,
        groupManager
    }
}
export default videoColumnDetail;