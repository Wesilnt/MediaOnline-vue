import { getMyLike } from '../../api/myApi'
import { postDelMyLike } from '../../api/myApi'
const myLike = {
  namespaced: true,
  state: {
    likeList: [],
    loading: false
  },
  mutations: {
    saveList(state, payload) {
      console.log(payload)
      Object.assign(state, payload)
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    },
    modifyLikeList(state, { id }) {
      for (var i = 0; i < state.likeList.length; i++) {
        if (state.likeList[i].id === id) state.likeList.splice(i, 1)
      }
    }
  },
  actions: {
    async queryList({ dispatch, commit, state }) {
      await commit('toggleLoading', {
        loading: true
      })
      const response = await getMyLike()
      await commit({
        type: 'saveList',
        likeList: response
      })
      commit('toggleLoading', {
        loading: false
      })
    },
    async delMyLike({ dispatch, commit, state }, { id }) {
      //删除服务器上的消息
      const response = await postDelMyLike({ lessonId: id })
      if (!response) return
      //删除本地的消息
      await commit('modifyLikeList', {
        id: id
      })
    }
  }
}
export default myLike
