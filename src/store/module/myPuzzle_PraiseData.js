import { queryMyPuzzleList, queryMyPraise } from '../../api/myApi'

const myPuzzle_PraiseData = {
  namespaced: true,
  state: {
    currentType: '1200',
    puzzleList: [],
    pageSize: 8,
    currentPage: 1,
    totalCount: 9,
    querying: false,
    refreshing: false
  },
  getters: {
    finished: ({ totalCount, currentPage, pageSize }) => {
      return totalCount <= currentPage * pageSize
    }
  },
  mutations: {
    saveStatus(state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    async queryList(
      { dispatch, commit, state },
      { isPraise, currentType: type, pageSize, currentPage, loadType }
    ) {
      const params = { pageSize, currentPage, type }
      const response = isPraise
        ? await queryMyPraise(params)
        : await queryMyPuzzleList(params)

      if (response) {
        const { totalCount, result } = response
        await commit({
          type: 'saveStatus',
          puzzleList: result,
          currentType: type,
          pageSize,
          currentPage,
          totalCount,
          [loadType]: false
        })
      }
    },
    async toggleCurrentType({ dispatch, commit }, payload) {
      await commit('saveStatus', {
        [payload.loadType]: true
      })
      await dispatch({ type: 'queryList', ...payload })
    }
  }
}
export default myPuzzle_PraiseData
