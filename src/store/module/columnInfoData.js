import { getColumns } from '../../api/columnsApi.js'

const columnInfoData = {
  namespaced: true,
  state: {
    columnHeaderImage: '', //专栏头图
    columns: [], //专栏数组
    finished: false, //是否加载完所有数据
    loading: false, //控制是否加载中
    currentPage: 1
  },
  mutations: {
    addColumns(state, payload) {
      state.currentPage = payload.page
      if (state.currentPage == 1) {
        state.columns = []
      }
      state.columns = state.columns.concat(payload.columnList)
      state.columnHeaderImage = payload.columnHeaderImage
      state.finished = state.columns.length >= payload.totalCount
      state.loading = false
    },
    toggleLoading(state, params) {
      state.loading = params.loading
    }
  },
  actions: {
    async getColumnList({ commit, state }, { type, pageSize, currentPage }) {
      //获取视频列表数据
      if (state.finished || state.loading) return
      await commit('toggleLoading', { loading: true })
      let page = currentPage || state.currentPage + 1
      const res = await getColumns({ type, pageSize, currentPage: page })
      let columnList = res.courseInfo.result
      let columnHeaderImage = res.bannerPic
      let totalCount = res.courseInfo.totalCount
      commit('addColumns', { columnHeaderImage, columnList, page, totalCount })
    }
  }
}
export default columnInfoData