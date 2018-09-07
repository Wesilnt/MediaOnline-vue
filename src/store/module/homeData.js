import {getBannerList,getFreeList,getNewMessageCount, getVisionList,getVideoList,getBookList} from '../../services/homeService'

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
        async getBannerList({ commit }) {
            // homeService.getBannerList(bannerList => {
            //     commit('setBannerList', bannerList)
            // })
            console.log('获取banner')
          let result = await getBannerList({type:0});
          console.log(result);
          commit('setBannerList', result)
        },
        getFreeList({ commit }) {
            getFreeList(freeList => {
                commit('setFreeList', freeList)
            })
        },
        getNewMessageCount({commit}){
            getNewMessageCount(newMessageCount=>{
                commit('setNewMessageCount', newMessageCount)
            })
        },
        getVisionList({ commit }) {
            getVisionList(visionList => {
                commit('setVisionList', visionList)
            })
        },
        getVideoList({ commit }) {
            getVideoList(videoList => {
                commit('setVideoList', videoList)
            })
        },
        getBookList({ commit }) {
            getBookList(bookList => {
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
