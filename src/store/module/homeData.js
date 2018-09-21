import {
  getBannerList,
  getFreeList,
  getNewMessageCount,
  getVisionList,
  getVideoList,
  getBookList
} from '../../services/homeService'
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
    async getIndexPageData({ dispatch }) {
      await dispatch('getBannerList')
      await dispatch('getNewMessageCount')
      await dispatch('getFreeList')
      await dispatch('getVisionList')
      await dispatch('getVideoList')
      await dispatch('getBookList')
    },
    async getBannerList({ commit }) {
      console.log('首页接口1')
      let result = await getBannerList({ type: 0 })
      commit('setBannerList', result)
    },
    async getFreeList({ commit }) {
      console.log('首页接口2')
      let result = await getFreeList({ pageSize: 2 })
      commit('setFreeList', result.result)
    },
    async getNewMessageCount({ commit }) {
      console.log('首页接口3')
      let result = await getNewMessageCount({ busiTypes: 3101 })
      commit('setNewMessageCount', result.data)
    },
    async getVisionList({ commit }) {
      console.log('首页接口4')
      let result = await getVisionList()
      commit('setVisionList', result)
    },
    async getVideoList({ commit }) {
      console.log('首页接口6')
      let result = await getVideoList()
      commit('setVideoList', result)
    },
    async getBookList({ commit }) {
      console.log('首页接口7')
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
