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
    modifyLikeList(state, { id }) {
      for (let i = 0; i < state.likeList.length; i++) {
        if (state.likeList[i].id === id) state.likeList.splice(i, 1)
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
        id: id
      })
    },
    async batchDelMyLike({dispatch, commit, state},{likeCheckList}) {
      console.log("likeCheckList" + likeCheckList)
      let idsStr = ''
      if (likeCheckList.length > 0) {
        for (let i = 0; i < likeCheckList.length; i++) {
          if (likeCheckList[i] === true) {
            idsStr += state.likeList[i].id + ','
          }
        }
      }
      console.log("idsStr:" + idsStr)
      if(idsStr === '')return
      //删除服务器上的消息
     // const response = await postBatchDelMyLike({id: idsStr})
/*      if (!response) return
      //删除本地的消息
      await commit('modifyLikeList', {
        id: id
      })*/
      commit('toggleLoading', {
        loading: false
      })
    }
  }
}
export default myLikeData
