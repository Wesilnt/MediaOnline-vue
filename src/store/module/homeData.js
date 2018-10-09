import {
  getBannerList,
  getFreeList,
  getNewMessageCount,
  getVisionList,
  getVideoList,
  getBookList
} from '../../api/homeApi'
const homeData = {
  namespaced: true,
  state: {
    bannerList: [],
    newMessageCount:0,
    freeList: [],
    visionList: [],
    videoList: [],
    bookList: []
  },
  actions: {
    async getIndexPageData({ dispatch }) {
      await dispatch('getBannerList')
      await dispatch('getNewMessageCount')
      await dispatch('getFreeList')
      await dispatch('getVisionList')
      await dispatch('getVideoList')
      await dispatch('getBookList')
    },
    async getBannerList({ commit }) {
      let result = await getBannerList({ type: 0 })
      commit('setBannerList', result)
    },
    async getFreeList({ commit }) {
      let result = await getFreeList({ pageSize: 2 })
      commit('setFreeList', result.result)
    },
    async getNewMessageCount({ commit }) {
      let result = await getNewMessageCount({ busiTypes: '3101,3102,3103,3105,3106'})
      commit('setNewMessageCount', result)
    },
    async getVisionList({ commit }) {
      let result = await getVisionList()
      commit('setVisionList', result)
    },
    async getVideoList({ commit }) {
      let result = await getVideoList()
      commit('setVideoList', result)
    },
    async getBookList({ commit }) {
      let result = await getBookList()
      commit('setBookList', result)
    }
  },
  mutations: {
    setBannerList(state, bannerList) {
      state.bannerList = bannerList
    },
    setFreeList(state, freeList) {
      state.freeList = freeList
    },
    setNewMessageCount(state, newMessageCount) {
      state.newMessageCount = newMessageCount
    },
    setVisionList(state, visionList) {
      state.visionList = visionList
    },
    setVideoList(state, videoList) {
      state.videoList = videoList
    },
    setBookList(state, bookList) {
      state.bookList = bookList
    }
  }
}

export default homeData
