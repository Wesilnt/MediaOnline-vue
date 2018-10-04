import { postDelMessage } from '../../api/myApi'
import { getMessage } from '../../api/myApi'
const myReplyData = {
  namespaced: true,
  state: {
    messageList: [],
    loading: false
  },
  mutations: {
    saveList(state, payload) {
      console.log(payload)
      Object.assign(state, payload)
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    }
  },
  actions: {
    async queryList({ dispatch, commit, state }) {
      await commit('toggleLoading', {
        loading: true
      })
      const response = await getMessage({ busiTypes: '3101' })
      await commit({
        type: 'saveList',
        messageList: response
      })
      commit('toggleLoading', {
        loading: false
      })
    },
    async delMessage({ dispatch, commit, state }, { msgId }) {
      //删除服务器上的消息
      const response = await postDelMessage({ id: msgId })
      if (!response) return
      //删除本地的消息
      await commit('modifyMessageList', {
        id: msgId
      })
    }
  }
}
export default myReplyData
