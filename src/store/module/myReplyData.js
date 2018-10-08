import {
  getMessage,
  getUsedMessage ,
  postDelMessage
} from '../../api/myApi'
const myReplyData = {
  namespaced: true,
  state: {
    messageList: [],
    usedMessageList:[],
    loading: false
  },
  mutations: {
    saveList(state, payload) {
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
      //将返回的json对象中的 content Json字符串转化成 Json对象
      for(let i= 0; i < response.length; i++) {
        response[i].content = JSON.parse(response[i].content)
      }
      await commit({
        type: 'saveList',
        messageList: response
      })
      commit('toggleLoading', {
        loading: false
      })
    },
    async queryUsedList({ dispatch, commit, state }) {

      const response = await getUsedMessage({ busiTypes: '3101' })
      //将返回的json对象中的 content Json字符串转化成 Json对象
      for(let i= 0; i < response.length; i++) {
        response[i].content = JSON.parse(response[i].content)
      }
      await commit({
        type: 'saveList',
        usedMessageList: response
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
