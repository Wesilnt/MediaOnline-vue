import { uploadAnswer } from '../../api/columnsApi'

const questionListData = {
  namespaced: true,
  state() {
    return {
      answers: {},
      answersChecked: false,
      questionIndex: 0,
      loading: false
    }
  },
  getters: {
    questionList: (state, getters, { videoCourseDetailData }) =>
      videoCourseDetailData.questionBOList,
    questionLength: (state, getters) => getters.questionList.length,
    correct: (state, getters) => {
      const { questionList } = getters
      return questionList.reduce((prev, item) => {
        if (item.answer === item.rightOpt) prev++
        return prev
      }, 0)
    },
    deblock: (state, getters, { videoCourseDetailData }) =>
      videoCourseDetailData.deblockQuestion,
    progress: (state, getters, { videoCourseDetailData }) =>
      videoCourseDetailData.progress,
    deblockTime: (state, getters, { videoCourseDetailData }) => {
      const { totalTime, progress } = videoCourseDetailData
      return parseInt((0.7 - progress / 100) * totalTime)
    },
    grade: (state, getters, { videoCourseDetailData }) => videoCourseDetailData.grade,
    title: (state, getters, { videoCourseDetailData }) => videoCourseDetailData.title,
    questionInfo: ({ questionIndex, answers, text }, getters) => {
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
      const isCorrect = userSelect === `${rightOpt}`
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
        userSelect: userSelect ? `opt${answers[id]}` : null,
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
    async renderAnswers({ getters, commit }) {
      const { questionList } = getters
      const answers = questionList.reduce((prev, { id, answer }) => {
        if (answer) prev[id] = answer
        return prev
      }, {})
      commit('saveStatus', {
        answers,
        answersChecked: true,
        questionIndex: Object.values(answers).length
      })
    },
    async uploadAnswer(
      { dispatch, commit, state, getters },
      { answer, lessonId }
    ) {
      const { id } = getters.questionInfo
      await commit('saveStatus', {
        loading: true
      })
      const formatAnsmwer = answer[answer.length - 1]
      commit('saveAnswer', {
        answers: { [id]: formatAnsmwer }
      })
      const response = await uploadAnswer({
        answer: formatAnsmwer,
        lessonId
      })
      if (!response) return
      /*await commit('saveStatus', {
        loading: false,
        newGrade: response
      })*/
    },
    async handleNext({ dispatch, commit }, { nextIndex }) {
      await commit('saveStatus', {
        questionIndex: nextIndex
      })
    },
  }
}
export default questionListData
