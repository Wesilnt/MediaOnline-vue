import { getCoinNumber, getCoinRecord } from '../../api/walletApi';

export default {
    namespaced: true,
    state: {
        coinNumber: 0,                                      //当前用户书币总数
        coinRecords: [],                                    //用户书币明细列表
        finished: false,                                   //明细加载是否完成
        isLoading: false,                                  //明细列表loading
        currentPage: 1,                                     //书币明细列表页码
        pageSize: 10                                        //明细列表页记录数

    },
    mutations: {
        bindUserCoinNumber(state, res) {
            state.coinNumber = res
        },
        bindCoinRecord(state, data) {
            Object.assign(state,data)
        },
        toggleLoading(state, isLoading) {
            state.isLoading = isLoading
        }
    },
    actions: {
        /**获取用户书币*/
        async getCoinNumber({ commit, dispatch }) {
            dispatch('getCoinRecord', true)
            const res = await getCoinNumber()
            if (undefined == res) return
            commit('bindUserCoinNumber', res)
        },

        /**获取用户书币明细列表*/
        async getCoinRecord({ state, commit }, refresh) {
            if (state.finished || state.isLoading) return
            await commit('toggleLoading', true)
            let currentPage = refresh ? 1 : state.currentPage + 1
            let params = {currentPage,pageSize:state.pageSize}
            const res = await getCoinRecord(params)
            await commit('toggleLoading', false)
            if (!res) return
            const data = refresh ?res.result : state.coinRecords.concat(res.result)
            let finished = data.length >= res.totalCount
            commit('bindCoinRecord', {coinRecords: data, currentPage,finished})
        }

    },
    getters: {}
};
