import {
  postBatchDelMessage ,
  getMessage
} from '../../api/myApi'

const mySysMessageData = {
  namespaced: true,
  state: {
    messageList: [{id:'10001',busiType:3102,content:'测试消息测试消息'},{id:'10002',busiType:3105,content:'测试消息测试消息2'}
      ,{id:'10003',busiType:3102,content:'测试消息测试消息3'},{id:'10004',busiType:3105,content:'测试消息测试消息4'}
      ,{id:'10005',busiType:3102,content:'测试消息测试消息测试消息测试消息测试消息测试消息'},{id:'10006',busiType:3105,content:'测试消息测试消息'}
      ,{id:'10007',busiType:3102,content:'测试消息测试消息5'},{id:'10008',busiType:3105,content:'测试消息测试消息3'}],
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
        for (let i = 0; i < state.messageList.length; i++) {
         state.messageListCheck[i] = false
        }
      }
    },
    setCheckList(state,status) {
      if (state.messageListCheck.length > 0) {
        for (let i = 0; i < state.messageListCheck.length; i++) {
          state.messageListCheck[i] = status
        }
      }
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    },
    modifyMessageList(state, { id }) {
      for (let i = 0; i < state.messageList.length; i++) {
        if (state.messageList[i].id === id) state.messageList.splice(i, 1)
      }
    }
  },
  actions: {
    async queryList({ dispatch, commit, state }) {

      const response = await getMessage({ busiTypes: '3102,3103,3105,3106' })
      if(response.length === 0)return
      await commit({
        type: 'saveList',
        messageList: response
      })
    },

    async delMessage({ dispatch, commit, state }, { msgId }) {
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
    },
    async delManyMessage({ dispatch, commit, state }) {
      let idsStr = ''
      let idsArray = []
      if (state.messageListCheck.length > 0) {
        for (let i = 0; i < state.messageListCheck.length; i++) {
          if(state.messageListCheck[i] === true){
            idsStr += state.messageList.id + ','
          }
        }
      }
      //删除服务器上的消息
      const response = await postBatchDelMessage({ id: idsStr })
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
export default mySysMessageData
