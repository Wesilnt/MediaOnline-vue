import {
  sendMobileCode,
  validateMobileCode
} from '../../services/mobileApi'

export default {
  name:"mobile",
  namespaced:true,
  state: {
      remainTime: '发送短信', 
      clickable: true,
      validate: false,
      sending:false
  },
  mutations: {
    init(state){
      state.remainTime = '发送短信'
      state.clickable = true
      state.sending = false
    },
    startSendCode(state){
      state.sending = true
      state.clickable = false
      state.remainTime = ''
    },
    endSendCode(state){
      state.sending = false
    },
    countDownTime(state,time){ 
      state.sending = false
      if(-1==time) state.remainTime = '发送短信'
      else if(0==time) state.remainTime = '重新发送'
      else state.remainTime = '剩余'+time+'s'
      state.clickable = -1==time || 0== time
    },
    setValidateResult(state,res){
      state.validate = true
    }
  },
  actions: {
    //发送手机号验证码
    async sendMobileCode({ commit }, params) {
      await commit('startSendCode')
      const res = await sendMobileCode(params)
      if (!res){
        await commit('endSendCode')
        return
      } 
      let totalTime = 60
      commit('countDownTime', totalTime)
      let interval = setInterval(()=>{
          commit('countDownTime',--totalTime)
          if(totalTime<=0) clearInterval(interval)
      }, 1000)
    },
    //校验手机验证码
    async validateMobileCode({ commit }, params) { 
      const res = await validateMobileCode(params)
      if (!res) return
      commit('setValidateResult', res) 
    },
  },
  getters: {},
}