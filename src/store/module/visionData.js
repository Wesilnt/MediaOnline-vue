import { getVisionList,getVisionDetail } from '../../services/visionService'

const visionData = {
    namespaced: true,
    state: {
        bannerPic:'',
        visionList:[],
        currentPage:1,
        pageSize:6,
        showTip:false,
        visionDetail:Object
    },
    actions:{
      async  getVisionListData({commit,state}){
          let result = await getVisionList({currentPage:state.currentPage, pageSize:state.pageSize, type:1003})
          commit('setBannerPic', result.bannerPic)
          commit('setVisionList', result.courseInfo.result)
        },
        async getMoreData({commit, state}){
            commit('setCurrentPage', state.currentPage + 1);
            let result = await getVisionList({currentPage:state.currentPage, pageSize:state.pageSize, type:1003})
            console.log(result.courseInfo.result)
            commit('setVisionList', state.visionList.concat(result.courseInfo.result))
        },
        async getVisionDetail({commit},courseId){
            let result = await getVisionDetail({'courseId':courseId})
            console.log(result)
            commit('setVisionDetail', result);
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
        }
    }
}

export default visionData
