import { getQuestionList } from '../../services/columns'
let timeInter = ''
const questionList = {
  namespaced: true, // 设置命名空间 ，保持数据独立性
  state: {
    questionList: [],
    answers: {},
    questionIndex: 0,
    score: 30,
    correct: 0,
    warnClass: '',
    loading: false
  },
  getters: {
    currentQuestion: ({ questionIndex, questionList }) => {
      const queations = {
        question: ''
      }
      return { ...queations, ...questionList[questionIndex] }
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
    saveStatus(state, payload) {
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
        type: 'saveStatus',
        questionList: response
      })
      commit('toggleLoading', {
        loading: false
      })
    },
    async handleAnswerClick({ dispatch, commit, state, getters }, { answer }) {
      const { answers } = state
      const { id } = getters.currentQuestion
      if (answers[id]) {
        return
      }
      commit('saveStatus', {
        answers: { [id]: answer }
      })
    },
    async handleNextClick({ dispatch, commit, state, getters }) {
      const { questionIndex, questionList, answers } = state
      const { id } = getters.currentQuestion
      if (!answers[id]) {
        clearTimeout(timeInter)
        commit('saveStatus', {
          warnClass: 'shake'
        })
        return (timeInter = setTimeout(() => {
          commit('saveStatus', {
            warnClass: ''
          })
        }, 1200))
      }
      const nextIndex = questionIndex + 1
      if (nextIndex + 1 > questionList.length) {
        console.log('没了')
      } else {
        commit('saveStatus', {
          questionIndex: nextIndex
        })
      }
    }
  }
}
export default questionList
