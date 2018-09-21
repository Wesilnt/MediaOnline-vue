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
  namespaced: true,
  state: {
    puzzleTabs,
    puzzleTypes,
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
        console.log(payload.loadType);
        await commit('saveStatus', {
        [payload.loadType]: true
      })
      await dispatch({ type: 'queryList', ...payload })
    }
  }
}
export default myPuzzle_Praise
