import { sendMobileCode, validateMobileCode } from '../../api/mobileApi';
import store from '../store';

export default {
    name: 'mobile',
    namespaced: true,
    state: {
        getCodeTip: '获取验证码',
        remainTime: '发送短信',
        clickAble: true,
        validate: false,
        sending: false
    },
    mutations: {
        init(state) {
            state.remainTime = '发送短信';
            state.clickAble = true;
            state.sending = false;
        },
        startSendCode(state) {
            state.sending = true;
            state.clickAble = false;
            state.remainTime = '';
        },
        endSendCode(state) {
            state.sending = false;
            state.remainTime = '发送失败';
            state.getCodeTip = '重新获取';
        },
        countDownTime(state, time) {
            state.sending = false;
            if (-1 == time) {
                state.remainTime = '发送短信';
                state.getCodeTip = '获取验证码';
            }
            else if (0 == time) {
                state.remainTime = '重新发送';
                state.getCodeTip = '重新获取';
            }
            else {
                state.remainTime = '剩余' + time + 's';
                state.getCodeTip = `重新获取(${time})`;
            }
            state.clickAble = -1 == time || 0 == time;
        },
        setValidateResult(state, res) {
            state.validate = true;
        }
    },
    actions: {
        //发送手机号验证码
        async sendMobileCode({ commit }, params) {
            await commit('startSendCode');
            const res = await sendMobileCode(params);
            if (0 != res) {
                await commit('endSendCode');
                return;
            }
            let totalTime = 60;
            commit('countDownTime', totalTime);
            let interval = setInterval(() => {
                commit('countDownTime', --totalTime);
                if (totalTime <= 0) clearInterval(interval);
            }, 1000);
        },
        async directSendMobileCode({ commit }, params) {

            const res = await sendMobileCode(params);
            if (!res) {
                await commit('endSendCode');
                return;
            }
        },
        //校验手机验证码
        async validateMobileCode({ commit }, params) {
            const res = await validateMobileCode(params);
            if (!res) return;
            commit('setValidateResult', res);

            // 更新本地用户信息
            await store.dispatch('getUserInfo', true);
            return true
        }
    },
    getters: {}
};
