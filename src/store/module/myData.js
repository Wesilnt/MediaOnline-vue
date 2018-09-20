import { getNewMessageCount } from '../../services/my'
const myData= {
  namespaced: true, // 设置命名空间 ，保持数据独立性
  state: {
    newReplyMessageCount:0,
    newSysMessageCount:0,
    loading: false
  },
  mutations: {
    setNewMessageCount(state, payload) {
      console.log(payload)
      Object.assign(state, payload)
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    },
  },
  actions: {
    async queryNewMessageCount({ dispatch, commit, state }) {
      let replyResult = await getNewMessageCount({ busiTypes: 3101 })
      if (replyResult) {
        commit('setNewMessageCount', replyResult.data)
      }

      let sysResult = await getNewMessageCount({ busiTypes: 3103 })
      if(sysResult){
        commit('setNewMessageCount', sysResult.data)
      }

    }
  }
}
export default myData
