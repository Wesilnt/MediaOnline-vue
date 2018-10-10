import {
  getPlayRecord,
  postDelPlayRecord,
  postBatchDellayRecord
} from '../../api/myApi'
const myPlayRecordData = {
  namespaced: true,
  state: {
    playRecordList: [],
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
    modifyPlayRecordList(state, { ids }) {
      let idArray = new Array();
      idArray = ids.split(',')
      for (let i = 0; i < idArray.length; i++) {
        for (let j = 0; j < state.playRecordList.length; j++) {
          if (idArray[i].indexOf(state.playRecordList[j].userLessonId) != -1) state.playRecordList.splice(j, 1)
        }
      }
    }
  },
  actions: {
    async queryList({ dispatch, commit, state }) {
      await commit('toggleLoading', {
        loading: true
      })
      const response = await getPlayRecord({ currentPage: 1, pageSize: 50 })
      await commit({
        type: 'saveList',
        playRecordList: response.result
      })
      commit('toggleLoading', {
        loading: false
      })
    },
    async delPlayRecord({ dispatch, commit, state }, { id }) {
      //删除服务器上的消息
      const response = await postDelPlayRecord({ id: id })
      if (!response) return
      //删除本地的消息
      await commit('modifyPlayRecordList', {
        ids: id
      })
    },
    async batchDelPlayRecord({dispatch, commit, state},{ids}) {
      console.log("ids" + ids)
      //删除服务器上的消息
      const response = await postBatchDellayRecord({ ids })
      if (!response) return
      //删除本地的消息
      await commit('modifyPlayRecordList', {
        ids: ids
      })
    }
  }
}
export default myPlayRecordData
