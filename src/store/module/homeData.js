import homeService from '../../services/homeService'

const homeData = {
    namespaced: true,
    state: {
        bannerList: [],
        newMessageCount: 0,
        freeList: [],
        visionList: [],
        videoList: [],
        bookList: []
    },
    actions: {
        getBannerList({ commit }) {
            homeService.getBannerList(bannerList => {
                commit('setBannerList', bannerList)
            })
        },
        getFreeList({ commit }) {
            homeService.getFreeList(freeList => {
                commit('setFreeList', freeList)
            })
        },
        getNewMessageCount({commit}){
            homeService.getNewMessageCount(newMessageCount=>{
                commit('setNewMessageCount', newMessageCount)
            })
        },
        getVisionList({ commit }) {
            homeService.getVisionList(visionList => {
                commit('setVisionList', visionList)
            })
        },
        getVideoList({ commit }) {
            homeService.getVideoList(videoList => {
                commit('setVideoList', videoList)
            })
        },
        getBookList({ commit }) {
            homeService.getBookList(bookList => {
                commit('setBookList', bookList)
            })
        }
    },
    mutations: {
        setBannerList(state, bannerList) {
            state.bannerList = bannerList;
        },
        setFreeList(state, freeList) {
            state.freeList = freeList;
        },
        setNewMessageCount(state, newMessageCount){
            state.newMessageCount = newMessageCount;
        },
        setVisionList(state, visionList) {
            state.visionList = visionList;
        },
        setVideoList(state, videoList) {
            state.videoList = videoList;
        },
        setBookList(state, bookList) {
            state.bookList = bookList;
        }
    }
}

export default homeData
