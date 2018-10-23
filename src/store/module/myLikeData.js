import {
  getMyLike,
  postDelMyLike,
  postBatchDelMyLike,
} from '../../api/myApi'
const myLikeData = {
  namespaced: true,
  state: {
    likeList: [],
    loading: false,
  },
  mutations: {
    saveList(state, payload) {
      console.log(payload)
      Object.assign(state, payload)
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    },
    modifyLikeList(state, { ids }) {
      let idArray = new Array();
      idArray = ids.split(',')
      for (let i = 0; i < idArray.length; i++) {
        for (let j = 0; j < state.likeList.length; j++) {
          if (idArray[i].indexOf(state.likeList[j].id) != -1) state.likeList.splice(j, 1)
        }
     }
    }
  },
  actions: {
    async queryList({dispatch, commit, state}) {
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
    async delMyLike({dispatch, commit, state}, {id}) {
      //删除服务器上的消息
      const response = await postDelMyLike({lessonId: id})
      if (!response) return
      //删除本地的消息
      await commit('modifyLikeList', {
        ids: id
      })
    },
    async batchDelMyLike({dispatch, commit, state},{ids}) {
      console.log("ids" + ids)
      //删除服务器上的消息
      const response = await postBatchDelMyLike({ lessonIds: ids })
      if (!response) return
      //删除本地的消息
      await commit('modifyLikeList', {
        ids: ids
      })
    }
  }
}
export default myLikeData
