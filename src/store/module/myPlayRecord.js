import { getPlayRecord } from '../../services/my'
import { postDelPlayRecord} from '../../services/my'
const myPlayRecord = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
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
    playRecordList(state,{id}){
      for (var i = 0; i < state.playRecordList.length; i++) {
        if (state.playRecordList[i].id === id)
          state.playRecordList.splice(i,1)
      }
    }
  },
  actions: {
    async queryList({ dispatch, commit, state }) {
      await commit('toggleLoading', {
        loading: true
      })
      const response = await getPlayRecord({currentPage:1,pageSize:20})
      await commit({
        type: 'saveList',
        playRecordList: response.result
      })
      commit('toggleLoading', {
        loading: false
      })
    },
    async delPlayRecord({ dispatch, commit, state },{ id }) {
      //删除服务器上的消息
      const response = await postDelPlayRecord({ lessonId: id})
      if (!response)return
      //删除本地的消息
      await commit('playRecordList', {
        id: id
      })
    }
  }
}
export default myPlayRecord
