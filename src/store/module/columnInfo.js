import { getColumns } from '../../services/columns.js'

const columnInfo = {
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
      // state.columnOriginData = payload
      // state.columns = payload.courseInfo.result
      // state.columnHeaderImage = payload.bannerPic
      state.currentPage = payload.page
      if (state.currentPage == 1) {
        state.columns = []
      }
      console.log('888888888888', payload.columnList)
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
      // const result = await getColumns({ type, pageSize, currentPage })
      if (state.finished || state.loading) return
      await commit('toggleLoading', { loading: true })
      let page = currentPage || state.currentPage + 1
      const res = await getColumns({ type, pageSize, currentPage: page })
      console.log(res)
      let columnList = res.courseInfo.result
      let columnHeaderImage = res.bannerPic
      let totalCount = res.courseInfo.totalCount
      commit('addColumns', { columnHeaderImage, columnList, page, totalCount })
    }
  }
}
export default columnInfo
