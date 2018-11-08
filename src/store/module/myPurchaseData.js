import { getMyPurchase } from '../../api/myApi'
import { purchaseQueryType } from '../../utils/config'
const totalCounts = {}
const lists = Object.keys(purchaseQueryType).reduce((prev, item) => {
  prev[item] = []
  totalCounts[item] = 0
  return prev
}, {})
const myPurchaseData = {
  namespaced: true,
  state: { lists, totalCounts, loading: true },
  getters: {
    noPurChaseData({ lists }) {
      return Object.values(lists).reduce((prev, item) => { 
        return prev & item.length
      }, 0)
    }
  },
  mutations: {
    saveList(state, { queryType, list, totalCount }) {
      state.lists = { ...state.lists, ...{ [queryType]: list } }
      state.totalCounts = {
        ...state.totalCounts,
        ...{ [queryType]: totalCount }
      }
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    }
  },
  actions: {
    async queryListItem({ dispatch, commit, state }, { type, orderBy, currentPage , pageSize }) {
      const response = await getMyPurchase({
        type,
        orderBy,
        currentPage,
        pageSize
      })
      const { totalCount, result: list } = response
      await commit({
        type: 'saveList',
        list,
        orderBy,
        totalCount,
        queryType: type
      })
    }
  }
}
export default myPurchaseData
