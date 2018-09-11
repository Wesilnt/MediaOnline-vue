import { getAudioDetail, postFavorite, getAudioDesc, getSingleSetList } from '../../services/audioApi'

export default {
    namespaced: true,
    state: {
        audioDetail: {}
    },
    mutations: {
        getAudioDetail(state, res) {
            state.audioDetail = res
        },
        postFavorite(state, res) {
          state.audioDetail.isLike = !state.audioDetail.isLike
        },
        getAudioDesc(state, res) {

        },
        getSingleSetList(state, res) {

        },
    },
    actions: {
        //音频单集详情
        async getAudioDetail({ commit }, params) {
            const res = await getAudioDetail(params)
            console.log(params)
            console.log(res)
            commit("getAudioDetail", res)
        },
        //音频收藏 我喜欢的
        async postFavorite({ commit }, params) {
            const res = await postFavorite(params)
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
            const res = await getSingleSetList(params)
            console.log(res)
            commit("getSingleSetList", res)
        }
    }
}