import { getMyPurchase } from '../../api/myApi'
const myPurchaseData = {
  namespaced: true,
  state: {
    onLineVisionByBoughtList: [],
    onLineVideoByBoughtList: [],
    onLineReadByBoughtList: [],
    onLineVisionByLearnList: [],
    onLineVideoByLearnList: [],
    onLineReadByLearnList: [],
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
    async queryListByBought({ dispatch, commit, state },{ type }) {
      const response = await getMyPurchase({
        type: type,
        orderBy: 'lastBought',
        currentPage: 1,
        pageSize: 50
      })

      if (type === 1003) {
        await commit({
          type: 'saveList',
          onLineVisionByBoughtList: response.result
        })
      } else if (type === 1005) {
        await commit({
          type: 'saveList',
          onLineVideoByBoughtList: response.result
        })
      } else if (type === 1007) {
        await commit({
          type: 'saveList',
          onLineReadByBoughtList: response.result
        })
      }
    },
    async queryListByLearn({ dispatch, commit, state },{ type }) {
      const response = await getMyPurchase({
        type: type,
        orderBy: 'lastLearn',
        currentPage: 1,
        pageSize: 50
      })

      if (type === 1003) {
        await commit({
          type: 'saveList',
          onLineVisionByLearnList: response.result
        })
      } else if (type === 1005) {
        await commit({
          type: 'saveList',
          onLineVideoByLearnList: response.result
        })
      } else if (type === 1007) {
        await commit({
          type: 'saveList',
          onLineReadByLearnList: response.result
        })
      }
    }
  }
}
export default myPurchaseData
