import { queryMyPuzzleList, queryMyPraise } from '../../services/my'
const puzzleTabs = {
  all: '全部',
  waiting: '中',
  succeed: '成功',
  fail: '失败'
}
const puzzleTypes = {
  all: '1200',
  waiting: '1202',
  succeed: '1203',
  fail: '1204'
}

const myPuzzle_Praise = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
  state: {
    puzzleTabs,
    puzzleTypes,
    currentType: '1200',
    puzzleList: [],
    pageSize: 6,
    currentPage: 1,
    totalCount: 1,
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
    async queryList(
      { dispatch, commit, state },
      { isPraise, currentType: type }
    ) {
      const { pageSize, currentPage } = state
      const params = { pageSize, currentPage, type }
      const response = isPraise
        ? await queryMyPraise(params)
        : await queryMyPuzzleList(params)

      if (response) {
        const { pageSize, currentPage, totalCount, result } = response
        await commit({
          type: 'saveList',
          puzzleList: result,
          currentType: type,
          pageSize,
          currentPage,
          totalCount
        })
        commit('toggleLoading', {
          loading: false
        })
      }
    },
    async toggleCurrentType({ dispatch, commit }, payload) {
      await commit('toggleLoading', {
        loading: true
      })
      await dispatch({ type: 'queryList', ...payload })
    }
  }
}
export default myPuzzle_Praise
