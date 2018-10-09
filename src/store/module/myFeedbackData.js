import { postFeedback } from '../../api/myApi'
import { Toast } from 'vant'

const myFeedbackData = {
  namespaced: true,
  state: {
    content: '',
    loading: false
  },
  getters: {
    contentLength: ({ content }) => content.length
  },
  mutations: {
    updateStatus(state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    async handleInput({ commit }, payload) {
      const content = payload.target.value
      if (content.length > 200) {
        return Toast.fail('您的字数超出限制')
      }
      await commit('updateStatus', {
        content
      })
    },
    async handleFeedback({ dispatch, commit, state }) {
      const { content } = state
      await commit('updateStatus', {
        loading: true
      })
      const response = await postFeedback({ content })
      if (!response) return
      await Toast.success({
        duration: 3000,
        message: '您的反馈已提交'
      })
      await commit('updateStatus', {
        loading: false,
        content: ''
      })
    }
  }
}
export default myFeedbackData
