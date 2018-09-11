import { getAudioDetail, postFavorite,postUnFavorite, getAudioDesc, getSingleSetList,getCommentList } from '../../services/audioApi'

export default {
    namespaced: true,
    state: {
        audioDetail: {},
        isLike:{isLoad:true, like:false},
        singleSetList:[],
        currentPage: 1,  //音频列表分页-页码
        pageSize:20,      //分页-记录条数
        commentList:[]    //评论列表

    },
    mutations: {
        getAudioDetail(state, res) {
            state.audioDetail = res 
            state.isLike ={isLoad:true,like:state.audioDetail.isLike}
        },
        postFavorite(state, res) {
          state.audioDetail.isLike = !state.audioDetail.isLike
          state.isLike ={isLoad:false,like:state.audioDetail.isLike}
        },
        getAudioDesc(state, res) {

        },
        getSingleSetList(state, res) {
         state.singleSetList = res.result
        },
        getCommentList(state, res) {
         state.commentList = res.result
        },
    },
    actions: {
        //音频单集详情
        async getAudioDetail({getters, commit,dispatch }, params) {
            const res = await getAudioDetail(params) 
            console.log(res)
            dispatch('getSingleSetList',{courseId:res.courseId,pageSize:getters.pageSize,})
            commit("getAudioDetail", res)
        },
        //音频收藏 我喜欢的
        async postFavorite({ commit }, params) {
            const res = await postFavorite(params)
            console.log("我喜欢的")
            console.log(res)
            commit("postFavorite", res)
        },
        //音频取消 我喜欢的
        async postFavorite({ commit }, params) {
            const res = await postUnFavorite(params)
            console.log("取消我喜欢的")
            console.log(res)
            commit("postFavorite", res)
        },
        //音频单集文稿详情
        async getAudioDesc({ commit }, params) {
            const res = await getAudioDesc(params)
            console.log(res)
            commit("getAudioDesc", res)
        },
        //音频单集列表
        async getSingleSetList({ commit }, params) {
            params.currentPage = (params.currentPage|1)+1
            const res = await getSingleSetList(params)
            console.log(res)
            commit("getSingleSetList", res) 
        },
        //音频单集列表
        async getCommentList({ commit }, params) {
            params.currentPage = (params.currentPage|1)+1
            const res = await getCommentList(params)
            console.log(res)
            commit("getCommentList", res)
        }
    },
    getters:{ 
      pageSize: state=> state.pageSize,
      currentPage: state => state.currentPage
    }
}