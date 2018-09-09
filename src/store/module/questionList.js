import { getQuestionList } from '../../services/columns'

const questionList = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
  state: {
    questionList: [],
    questionIndex: 0,
    score: 30,
    correct: 0,
    loading: false
  },
  getters: {
    currentQueston: ({ questionIndex, questionList }) => {
      return questionList[questionIndex]
    },
    questionInfo: ({ questionIndex, questionList, score }) => {
      const current = questionIndex + 1
      const len = questionList.length
      const isLastQuestion = current === len
      const nextBtnText = isLastQuestion ? '立即查看结果' : '下一题'
      const footerBadge = `${current} /\ ${len}`
      return {
        nextBtnText,
        footerBadge,
        isLastQuestion
      }
    }
  },
  mutations: {
    saveList(state, payload) {
      Object.assign(state, payload)
    },
    saveQuestionIndex(state, payload) {
      Object.assign(state, payload)
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    }
  },
  actions: {
    async queryList({ dispatch, commit, state }, { currentType }) {
      await commit('toggleLoading', {
        loading: true
      })
      const response = await getQuestionList(currentType)
      console.log(response)
      await commit({
        type: 'saveList',
        questionList: response
      })
      commit('toggleLoading', {
        loading: false
      })
    },
    async handleNextClick({ dispatch, commit, state }) {
      const { questionIndex, questionList } = state
      const nextIndex = questionIndex + 1
      if (nextIndex + 1 > questionList.length) {
        console.log('没了')
      } else {
        commit('saveQuestionIndex', {
          questionIndex: nextIndex
        })
      }
    }
  }
}
export default questionList
