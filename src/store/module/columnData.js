import { getVisionCourseList,getLessonListByCourse } from '../../api/columnsApi.js'

import groupContentData from './groupContentData'
import groupManagerData from './groupManagerData'

const columnData = {
    namespaced: true,
    state:{
        //-3 拼团失败 0 默认状态 1001 单购成功 1003 拼团成功 1005拼团中 1007集赞成功未领取 1008集赞成功已领取 1009集赞中
        userAccessStatus:0, //当前用户与专栏之间的关系
        isFromShare: false,//是否来自分享
        renderLoading:true, //控制骨架屏的显示
        pageSize:10,
        buyCount: 0, //购买数量
        //专栏列表页
        bannerPic: '', //专栏列表页的头图
        columnLoading:false,  //控制单集列表分页
        columnCurrentPage:1,
        columnList:[], //专栏列表
        columnFinished:false,  //分页数据是否加载完成
        //专栏详情页   
        lessonLoading:false,//控制专栏列表分页
        lessonCurrentPage:1,
        lessonFinished:false,//分页数据是否加载完成
        columnDetail:{}, //专栏对象
        lessonList: [], //单集列表/视频和读书会
        categoryList:[],//少年视野专栏下的分类
        freeLessonList: [], //试听试看课程数组
    },
    mutations:{
        //初始化数据
        initDatas(state, { columnId, groupBuyId }) {
            state.columnId = columnId
            state.isFromShare = groupBuyId ? true : false
        },
        saveStatus(state, payload) {
            Object.assign(state, payload)
        }
    },
    actions:{
        //获取少年视野的分类列表
        async getCategoryList({commit},columnId){
            const categoryList = await getVisionCourseList({columnId})
            commit('saveStatus',{categoryList})
        },
        //获取专栏下单集列表
        async getLessonList({commit,state},{columnId,refresh}){
            commit('saveStatus',{lessonLoading : true})
            const page  = refresh ? 1 : state.lessonCurrentPage + 1
            const res = await getLessonListByCourse({'columnId':columnId,currentPage:page, pageSize:state.pageSize})
            if(refresh){
                commit('saveStatus',
                {
                    lessonLoading : false, 
                    lessonList: res.result,
                    lessonCurrentPage : page, 
                })
            }else{
                const tempLessons = state.columnList.concat(res.result)
                const isFinished = tempLessons.length >= result.totalCount
                commit('saveStatus',
                {
                    lessonLoading : false,
                    lessonList: tempColumns,
                    lessonCurrentPage : page,
                    columnFinished : isFinished
                })
            }
        },
        //获取专栏列表
        async getColumnList({commit,state},{refresh,columnType}){
            commit('saveStatus',{columnLoading : true})
            const page  = refresh ? 1 : state.columnCurrentPage + 1
            const result = await getColumns({ type: columnType, currentPage: page, pageSize: state.pageSize }) 
            console.log("column ==",result)
            if(refresh){
                commit('saveStatus',
                {
                    columnLoading : false, 
                    columnList: result.courseInfo.result,
                    columnCurrentPage : page, 
                    pageSize
                })
            }else{
                const tempColumns = state.columnList.concat(result.courseInfo.result)
                const isFinished = tempColumns.length >= result.totalCount
                commit('saveStatus',
                {
                    columnLoading : false,
                    columnList: tempColumns,
                    columnCurrentPage : page,
                    columnFinished : isFinished
                })
            }
        },
        //获取专栏详情
        async getColumnDetail({ state, commit, dispatch }, { columnId, groupBuyId }) {
            //获取视频专栏数据
            const columnDetail = await dispatch('getColumnDetail',{columnId,columnType:'1005'},{root:true}) 
            console.log('专栏数据')   
            console.log(result) 
            if(!result) return
            //绑定业务类型,专栏头图,试听列表,专栏ID到拼团仓库中
            const profilePic = result.profilePic
            const freeLessonList = result.freeLessonList
            dispatch('groupManagerData/initColumnInfo', {
                columnId,
                profilePic,
                freeLesson: freeLessonList
            })
            //绑定专栏详情
            commit('saveStatus', {columnDetail})
            if (state.isFromShare) {
              //这里是分享链接进来的
              dispatch('groupManagerData/getGroupBuyDetail', groupBuyId)
            } else {
              //这里是正常途径进来的
              const toolsData = {
                courseName:result.name,
                courseId:result.id,
                collectLikeDuration: result.collectLikeDuration,
                collectLikeId: result.collectLikeId,
                collectLikePersonCount: result.collectLikePersonCount,
                collectLikeTemplateId: result.collectLikeTemplateId,
                groupBuyDuration: result.groupBuyDuration,
                groupBuyPersonCount: result.groupBuyPersonCount,
                groupBuyPrice: result.groupBuyPrice,
                groupBuyId: result.groupBuyId,
                groupBuyTemplateId: result.groupBuyTemplateId,
                userAccessStatus: result.userAccessStatus,
                price: result.price
              }
              dispatch('groupManagerData/initToolsBar', toolsData)
            }
          }
    },
    modules: {
        groupContentData,
        groupManagerData
    }
}

export default columnData