import {
  getBannerList,
  getFreeList,
  getNewMessageCount,
  getVisionList,
  getVideoList,
  getBookList,
  getAllList,
} from '../../api/homeApi'
const homeData = {
  namespaced: true,
  state: {
    loading: true,
    bannerList: [],
    newMessageCount: 0,
    fromAvatarUrl: '',
    freeList: [],
    visionList: [],
    videoList: [],
    bookList: []
  },
  actions: {
    async getIndexPageData({ dispatch, commit }) {
      console.log(
        '首页加载顺序为,轮播图和少年视野先加载（样式）,其他接口先返回数据就先加载'
      )
      await dispatch('getBannerList')
      dispatch('getNewMessageCount')
      // await dispatch('getFreeList')
      // dispatch('getVisionList')
      commit('setLoading', false)
      // dispatch('getVideoList')
      // dispatch('getBookList')
      dispatch('getAllList')
    },
    async getBannerList({ commit }) {
      let result = await getBannerList({ type: 0 })
      console.log(1)
      commit('setBannerList', result)
    },
    async getFreeList({ commit }) {
      let result = await getFreeList({ pageSize: 2 })
      console.log(2)
      commit('setFreeList', result.result)
    },
    async getNewMessageCount({ commit }) {
      const result = await getNewMessageCount()
      const { count , fromAvatarUrl  } = result
      console.log(3)
      console.log(result)
      commit('setNewMessageCount', count)
      commit('setFromAvatarUrl', fromAvatarUrl)
    },
    async getAllList({commit}){
      let result = await getAllList()
      commit('setVisionList', result.visionList)
      commit('setVideoList', result.videoList)
      commit('setBookList', result.bookList)
    },
    async getVisionList({ commit }) {
      let result = await getVisionList()
      console.log(4)
      commit('setVisionList', result)
    },
    async getVideoList({ commit }) {
      let result = await getVideoList()
      console.log(5)
      commit('setVideoList', result)
    },
    async getBookList({ commit }) {
      let result = await getBookList()
      console.log(6) 
      commit('setBookList', result)
    }
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    },
    setBannerList(state, bannerList) {
      state.bannerList = bannerList
    },
    setFreeList(state, freeList) {
      state.freeList = freeList
    },
    setFromAvatarUrl(state, fromAvatarUrl) {
      state.fromAvatarUrl = fromAvatarUrl
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
        if(bookList&&(bookList.length % 3 == 2|| 1 == bookList.length % 3)) bookList =bookList.concat({})
        state.bookList = bookList
    }
  }
}

export default homeData
