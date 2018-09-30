import { uploadAnswer } from '../../services/columns'
import { getMyUserInfo } from '../../services/my'

const questionList = {
  namespaced: true,
  state() {
    return {
      answers: {},
      answersChecked: false,
      questionIndex: 0,
      loading: false,
      // newGrade: ''
    }
  },
  getters: {
    questionList: (state, getters, { videoCourseDetail }) =>
      videoCourseDetail.questionBOList,
    questionLength: (state, getters) => getters.questionList.length,
    correct: (state, getters) => {
      const { questionList } = getters
      return questionList.reduce((prev, item) => {
        if (item.answer === item.rightOpt) prev++
        return prev
      }, 0)
    },
    videoTime: (state, getters, { videoCourseDetail }) =>
      videoCourseDetail.totalTime,
    delockTime: (state, getters) => getters.videoTime * 0.7,
    grade: (state, getters, { videoCourseDetail }) => videoCourseDetail.grade,
    title: (state, getters, { videoCourseDetail }) => videoCourseDetail.title,
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
    async getUser() {
      const response = await getMyUserInfo()
      return response
    }
  }
}
export default questionList
