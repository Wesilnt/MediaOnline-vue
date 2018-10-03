import { decrement, increment, log } from './type'
import { queryAlbums, queryPhotos, queryPosts } from '../../api/mock'

const mocker = {
  namespaced: true,
  state: {
    postList: [],
    albumList: [],
    photoList: [],
    loading: false
  },
  mutations: {
    // 必须为同步函数
    saveList(state, payload) {
      const { data } = payload
      const { type, list } = data
      console.log(list)
      state[type] = list
    },
    toggleLoading(state, payload) {
      state.loading = payload.loading
    }
  },
  actions: {
    // 可为异步函数
    async queryList({ dispatch, commit, state }, payload) {
      const { type } = payload
      let response = ''
      await commit('toggleLoading', {
        loading: true
      })
      if (type === 'postList') {
        response = await queryPosts()
      } else if (type === 'albumList') {
        response = await queryAlbums()
      } else {
        response = await queryPhotos({
          albumId: 1
        })
      }
      await commit({
        type: 'saveList',
        data: {
          type,
          list: response
        }
      })
      commit('toggleLoading', {
        loading: false
      })
    }
  }
}
export default mocker
