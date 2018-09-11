import { getQuestionList } from '../../services/columns'

const questionList = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
  state: {
    questionList: [],
    answers: {},
    questionIndex: 0,
    correct: 0,
    loading: false
  },
  getters: {
    questionInfo: ({ questionIndex, questionList, answers }) => {
      const queations = {
        question: ''
      }
      const current = questionIndex + 1
      const currentQuestion = { ...queations, ...questionList[questionIndex] }
      const { rightOpt, id } = currentQuestion
      const len = questionList.length
      const isLastQuestion = current === len
      const nextBtnText = isLastQuestion ? '立即查看结果' : '下一题'
      const footerBadge = `${current} /\ ${len}`
      const userSelect = answers[id]
      const isCorrect = userSelect === `opt${rightOpt}`
      const headerTitle =
        userSelect === undefined
          ? '请回答'
          : isCorrect
            ? '回答正确'
            : '回答错误'
      return {
        headerTitle,
        nextBtnText,
        footerBadge,
        isLastQuestion,
        ...currentQuestion,
        userSelect,
        isCorrect
      }
    }
  },
  mutations: {
    saveList(state, payload) {
      console.log(payload)
      Object.assign(state, payload)
    },
    saveAnswer(state, { answers }) {
      state.answers = { ... state.answers, ...answers }
    },
    saveStatus(state, payload) {
      Object.assign(state, { ...payload })
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
      await commit({
        type: 'saveList',
        questionList: response
      })
      commit('toggleLoading', {
        loading: false
      })
    },
    async handleAnswerClick({ dispatch, commit, state, getters }, { answer }) {
      const { answers } = state
      const { id } = getters.questionInfo
      if (answers[id]) {
        return
      }
      commit('saveAnswer', {
        answers: { [id]: answer }
      })
    },
    async handleNext({ dispatch, commit },{nextIndex}) {
       await commit('saveStatus', {
            questionIndex: nextIndex
        })
    }
  }
}
export default questionList
