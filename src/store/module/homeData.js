import {
  getBannerList,
  getFreeList,
  getNewMessageCount,
  getAllList
} from '../../api/homeApi'
const homeData = {
  namespaced: true,
  state: {
    loading: true,
    bannerList: [],
    newMessageCount: 0,
    fromAvatarUrl: '',
    columns: {
      bookList: [],
      freeList: [],
      videoList: [],
      visionList: []
    }
  },
  actions: {
    async getIndexPageData({ dispatch }) {
      await dispatch('getBannerList')
      dispatch('getNewMessageCount')
      await dispatch('getFreeList')
      dispatch('getAllList')
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
      const result = await getNewMessageCount()
      const { count, fromAvatarUrl } = result
      commit('setNewMessageCount', count)
      commit('setFromAvatarUrl', fromAvatarUrl)
    },
    async getAllList({ commit }) {
      let result = await getAllList();
        await commit('setVisionList', result.visionList);
        await commit('setVideoList', result.videoList);
        let bookList = result.bookList;
        if (bookList && (bookList.length % 3 == 2 || 1 == bookList.length % 3))
            bookList = bookList.concat({});
        await commit('setBookList', result.bookList);
        result.bookList = bookList;
        await commit('setList', result);
        commit('setLoading', false)
    },
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
      state.columns = { ...state.columns, freeList: freeList }
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
    setList(state, result) {
      state.columns = { ...state.columns, ...result }
    },
    setVideoList(state, videoList) {
      state.videoList = videoList
    },
    setBookList(state, bookList) {
      if (bookList && (bookList.length % 3 == 2 || 1 == bookList.length % 3))
        bookList = bookList.concat({})
      state.bookList = bookList
    }
  }
}

export default homeData
