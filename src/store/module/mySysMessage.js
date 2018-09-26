import { postDelMessage } from '../../services/my'
import { getMessage } from '../../services/my'
import { Vue } from 'vue'
const mySysMessage = {
  namespaced: true,
  state: {
    messageList: [{busiType:3102,content:'sadfsfasdfjas;dfj;'},{busiType:3105,content:'sasdfassdf是打发的份上weas;dfj;'}
      ,{busiType:3102,content:'阿斯顿发顺丰阿斯顿发顺丰单阿斯顿发顺丰单阿斯顿发顺丰单阿斯顿发顺丰单阿斯顿发顺丰单单;dfj;'},{busiType:3105,content:'sasdfasdfasfdw发送到发顺丰的'}
      ,{busiType:3102,content:'阿斯顿发顺丰单;dfj;'},{busiType:3105,content:'sasdfasdfasfdw发送到发顺丰的'}
      ,{busiType:3102,content:'阿斯顿发顺丰单;dfj;'},{busiType:3105,content:'sasdfasdfasfdw发送到发顺丰的'}],
    //messageList:[],
    loading: false,
    messageListCheck:[]
  },
  mutations: {
    saveList(state, payload) {
      console.log(payload)
      Object.assign(state, payload)
    },
    setCheckToList(state) {
      if (state.messageList.length > 0) {
        for (var i = 0; i < state.messageList.length; i++) {
         state.messageListCheck[i] = false
        }
      }
    },
    setCheckList(state,status) {
      if (state.messageListCheck.length > 0) {
        for (var i = 0; i < state.messageListCheck.length; i++) {
          state.messageListCheck[i] = status
        }
      }
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    },
    modifyMessageList(state, { id }) {
      for (var i = 0; i < state.messageList.length; i++) {
        if (state.messageList[i].id === id) state.messageList.splice(i, 1)
      }
    }
  },
  actions: {
    async queryList({ dispatch, commit, state }) {

      const response = await getMessage({ busiTypes: '3102,3103,3105,3106' })
      await commit({
        type: 'saveList',
        messageList: response
      })
    },

    async delSysMessage({ dispatch, commit, state }, { msgId }) {
      //删除服务器上的消息
      const response = await postDelMessage({ id: msgId })
      if (!response) return
      //删除本地的消息
      await commit('modifyMessageList', {
        id: id
      })
      commit('toggleLoading', {
        loading: false
      })
    }
  }
}
export default mySysMessage
