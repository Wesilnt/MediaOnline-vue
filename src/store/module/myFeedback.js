import { postFeedback } from '../../services/my'

const myFeedback = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
  state: {
    content:'',
    loading: false,
    error:''
  },

  getters:{
    hasValue:({content},)=> {
      if(content.length > 0){
        return true
      }else{
        return false
      }
    }
  },

  mutations: {
    toggleLoading(state, { loading }) {
      state.loading = loading
    },
    updateContent(state, e){
      if(e){
        state.content =  e.target.value
      }
    }
  },

  actions: {
    async handleFeedback({ dispatch, commit, state }) {
      await commit('toggleLoading', {
        loading: true
      })
      const {content}=state;
      const response = await postFeedback({content})
      if(response) {
        console.log(response)
      }else {
       state.error = "网络请求失败"
      }
      await commit('toggleLoading', {
        loading: false
      })
    }
  },
}
export default myFeedback
