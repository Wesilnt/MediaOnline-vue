import { getVisionList,getVisionDetail, getCommentList } from '../../services/visionService'

const visionData = {
    namespaced: true,
    state: {
        bannerPic:'',
        visionList:[],
        currentPage:1,
        totalPage:0,
        pageSize:6,
        showTip:false,
        visionDetail:Object,
        commentList:[]
    },
    actions:{
      async  getVisionListData({commit,state}){
          let result = await getVisionList({currentPage:state.currentPage, pageSize:state.pageSize, type:1003})
          commit('setBannerPic', result.bannerPic)
          commit('setVisionList', result.courseInfo.result)
        },
        async getMoreData({commit, state}){
            if(state.currentPage>= totalPage){

            }
            commit('setCurrentPage', state.currentPage + 1);
            let result = await getVisionList({currentPage:state.currentPage, pageSize:state.pageSize, type:1003})
            commit('setVisionList', state.visionList.concat(result.courseInfo.result))
        },
        async getVisionDetail({commit},courseId){
            let result = await getVisionDetail({'courseId':courseId})
            commit('setVisionDetail', result);
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
        }
    }
}

export default visionData
