import { getVisionList,getVisionDetail, getCommentList } from '../../services/visionService'
import groupManager from './groupManager'
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
          let result = await getVisionList({currentPage:state.currentPage, pageSize:state.pageSize, type:1003})
          commit('setBannerPic', result.bannerPic)
          commit('setVisionList', result.courseInfo.result)
          commit('setTotalCount',result.courseInfo.totalCount)
        },
        async getMoreData({commit, state}){
            commit('setIsLoading',true);
            commit('setCurrentPage', state.currentPage + 1);
            let result = await getVisionList({currentPage:state.currentPage, pageSize:state.pageSize, type:1003})
            let newList =state.visionList.concat(result.courseInfo.result);
            await commit('setFinished',newList.length>= state.totalCount);
            commit('setVisionList', newList)
            console.log(state.visionList)
            commit('setIsLoading',false);
        },
        async getVisionDetail({dispatch,commit},{courseId,groupBuyId}){
            let result = await getVisionDetail({'courseId':courseId})
            commit('setVisionDetail', result);
            commit('setCategoryList',result.categoryList)

            //设置底部购买工具栏
            const toolsData = {
              "collectLikeDuration" : result.collectLikeDuration,
              "collectLikeId" : result.collectLikeId,
              "collectLikePersonCount" : result.collectLikePersonCount,
              "collectLikeTemplateId" : result.collectLikeTemplateId,
              "groupBuyDuration" : result.groupBuyDuration,
              "groupBuyPersonCount" : result.groupBuyPersonCount,
              "groupBuyPrice" : result.groupBuyPrice,
              "groupBuyId":  groupBuyId || result.groupBuyId,
              "groupBuyTemplateId" : result.groupBuyTemplateId,
              "userAccessStatus" : result.userAccessStatus,
              'price': result.price
            }
            dispatch('groupManager/initToolsBar',toolsData)
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
      groupManager
    }
}

export default visionData
