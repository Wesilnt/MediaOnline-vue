import { postDelSysMessage } from '../../services/my'
import { getSysMessage } from '../../services/my'
const sysMessage = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
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
    },
    modifyMessageList(state,{id}){
      for (var i = 0; i < state.messageList.length; i++) {
        if (state.messageList[i].id === id)
          state.messageList.splice(i,1)
      }
    }
  },
  actions: {
    async queryList({ dispatch, commit, state }) {
      await commit('toggleLoading', {
        loading: true
      })
      const response = await getSysMessage({ busiTypes: '3102,3103,3105,3106'})
      await commit({
        type: 'saveList',
        messageList: response
      })
      console.log("sysMessage" + response)
      commit('toggleLoading', {
        loading: false
      })
    },
    async delSysMessage({ dispatch, commit, state },{ msgId }) {
      //删除服务器上的消息
      const response = await postDelSysMessage({ id: msgId})
      //删除本地的消息
      await commit('modifyMessageList', {
        id: msgId
      })
    }
  }
}
export default sysMessage
