import { getVisionList,getVisionDetail, getCommentList } from '../../api/visionServiceApi'
import groupManagerData from './groupManagerData'
const visionData = {
    namespaced: true,
    state: {
        bannerPic:'',
        visionList:[],
        currentPage:1,
        totalCount:0,
        pageSize:6,
        showTip:false,
        visionDetail:Object,
        categoryList:[],
        commentList:[],
        finished:false,
        isLoading:false
    },
    actions:{
        reverse({commit,state}){
            commit('setCategoryList',state.categoryList.slice().reverse());
        },
      async  getVisionListData({commit,state}){
          await commit('setCurrentPage', 1)
          let result = await getVisionList({currentPage:1, pageSize:state.pageSize, type:1003})
          await commit('setFinished', result.courseInfo.result.length>= state.totalCount);
          commit('setBannerPic', result.bannerPic)
          commit('setVisionList', result.courseInfo.result)
          commit('setTotalCount',result.courseInfo.totalCount)
        },
        async getMoreData({commit, state}){
            commit('setIsLoading',true);
            await commit('setCurrentPage', state.currentPage + 1); 
            let result = await getVisionList({currentPage:state.currentPage, pageSize:state.pageSize, type:1003})
            let newList =state.visionList.concat(result.courseInfo.result);
            await commit('setFinished',newList.length>= state.totalCount);
            console.log( state.totalCount)
            commit('setVisionList', newList)
            console.log(state.visionList)
            commit('setIsLoading',false);
        },
        async getVisionDetail({dispatch,commit},{courseId,groupBuyId}){
            let result = await getVisionDetail({'courseId':courseId})
            commit('setVisionDetail', result);
            console.log('代码走到这里了aaaa')
            console.log(result)
            commit('setCategoryList',result.categoryList)

            const profilePic = result.coverPic
            const freeLessonList = result.freeLessonList
            const serviceType = "OnlineVision"
            //绑定与拼团相关的内容
            dispatch('groupManagerData/initColumnInfo',{serviceType,courseId,profilePic,'freeLesson':freeLessonList})
            if (groupBuyId) {
                //这里是分享链接进来的
              dispatch('groupManagerData/getGroupBuyDetail', groupBuyId)
            } else {
                //这里是正常途径进来的
              const toolsData = {
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
        },
        async getCommentList({commit},courseId){
            let result = await getCommentList({regionType:2201, regionId:courseId, currentPage:1, pageSize:11})
            commit('setCommentList', result.result)
        }
    },
    mutations:{
        setVisionList(state, visionList){
            state.visionList = visionList;
        },
        setBannerPic(state, bannerPic){
            state.bannerPic = bannerPic;
        },
        setCurrentPage(state, currentPage){
            state.currentPage = currentPage;
        },
        setVisionDetail(state, visionDetail){
            state.visionDetail = visionDetail;
        },
        setCommentList(state, commentList){
            state.commentList = commentList;
        },
        setCategoryList(state,categoryList){
            state.categoryList = categoryList;
        },
        setFinished(state,finished){
            state.finished = finished;
        },
        setTotalCount(state,totalCount){
            state.totalCount = totalCount;
        },
        setIsLoading(state,isLoading){
            state.isLoading = isLoading;
        }
    },
    modules:{
      groupManagerData
    }
}

export default visionData
