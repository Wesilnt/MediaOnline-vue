import { getVideoList } from '../../../services/onlinecourse/videolist.js'
const videolist = {
  state: {
    videos: []
  },
  mutations: {
    getVideos(state, payload) {
      state.videos = payload
    }
  },
  actions: {
    async getVideoList({ commit }) {
      console.log('actinons')
      //获取视频列表数据
      const result = await getVideoList({ type: 2, pageSize: 10 })
      console.log(result)
      commit('getVideos', result)
    }
  },
  getters: {}
}
export default videolist
