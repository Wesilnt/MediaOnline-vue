import { getMyPurchase } from '../../services/my'
const myPurchase = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
  state: {
    onLineVisionList: [],
    onLineVideoList:[],
    onLineReadList:[],
    type:"lastBought",
    loading: false,
  },
  mutations: {
    saveList(state, payload) {
      console.log(payload)
      Object.assign(state, payload)
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    }
  },
  actions: {
    async queryList({ dispatch, commit, state },{type, orderBy}) {

      const response = await getMyPurchase({type:type, orderBy:'lastBought', currentPage:1,pageSize:50})
      console.log(response.result)
      if ( type === '1003' ){
        await commit({
          type: 'saveList',
          onLineVisionList: response.result
        })
      } else if( type === '1005' ){
        await commit({
          type: 'saveList',
          onLineVideoList: response.result
        })
      } else if( type === '1007') {
        await commit({
          type: 'saveList',
          onLineReadList: response.result
        })
      }
    }
  }
}
export default myPurchase