import { queryMyPuzzleList } from '../../services/my'
const puzzleTabs = {
  all: '全部',
  waiting: '中',
  succeed: '成功',
  fail: '失败'
}
const puzzleTypes = {
  all: '0',
  waiting: '1',
  succeed: '2',
  fail: '-1'
}

const myPuzzle_Praise = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
  state: {
    puzzleTabs,
    puzzleTypes,
    currentType: 0,
    puzzleList: [],
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
    async queryList({ dispatch, commit, state }, { currentType }) {
      const response = await queryMyPuzzleList(currentType)
      console.log(response)
      await commit({
        type: 'saveList',
        puzzleList: response,
        currentType
      })
      commit('toggleLoading', {
        loading: false
      })
    },
    async toggleCurrentType({ dispatch, commit }, { currentType }) {
      await commit('toggleLoading', {
        loading: true
      })
      await dispatch({ type: 'queryList', currentType })
    }
  }
}
export default myPuzzle_Praise
