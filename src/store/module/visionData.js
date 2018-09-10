import { getVisionList } from '../../services/visionService'

const visionData = {
    namespaced: true,
    state: {
        bannerPic:'',
        visionList:[],
        currentPage:1,
        pageSize:6
    },
    actions:{
      async  getVisionListData({commit}){
          let result = await getVisionList({currentPage:1, pageSize:6, type:1003})
          console.log(result)
          commit('setBannerPic', result.bannerPic)
          commit('setVisionList', result.courseInfo.result)
        }
    },
    mutations:{
        setVisionList(state, visionList){
            state.visionList = visionList;
        },
        setBannerPic(state, bannerPic){
            state.bannerPic = bannerPic;
        }
    }
}

export default visionData
