import { uploadAnswer } from '../../services/columns'
const questionList = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
  state: {
    answers: {},
    questionIndex: 0,
    correct: 0,
    loading: false
  },
  getters: {
    questionList: (state, getters, { videoCourseDetail }) =>
      videoCourseDetail.questionBOList,
    questionInfo: ({ questionIndex, answers }, getters) => {
      const { questionList } = getters
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
            : '您答错啦'
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
    saveAnswer(state, { answers }) {
      state.answers = { ...state.answers, ...answers }
    },
    saveStatus(state, payload) {
      Object.assign(state, { ...payload })
    },
    toggleLoading(state, { loading }) {
      state.loading = loading
    }
  },
  actions: {
    async uploadAnswer(
      { dispatch, commit, state, getters },
      { answer, lessonId }
    ) {
      const { answers } = state
      const { id } = getters.questionInfo
      if (answers[id]) {
        return
      }
      await commit('toggleLoading', {
        loading: true
      })
      commit('saveAnswer', {
        answers: { [id]: answer }
      })
      const response = await uploadAnswer({ answer, lessonId })
      if (!response) return
      await commit('toggleLoading', {
        loading: false
      })
    },
    async handleNext({ dispatch, commit }, { nextIndex }) {
      await commit('saveStatus', {
        questionIndex: nextIndex
      })
    }
  }
}
export default questionList
