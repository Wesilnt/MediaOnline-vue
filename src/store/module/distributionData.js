import {} from '../../api/distributionApi';

export default {
    namespaced: true,
    state: {
        isDistributor: false,                                      //是否是分销员
        distributorLevel: 2,                                        //分销员等级
        profitList: [],                                             //收益列表
        transferList: [],                                           //转账列表
        currentPage: 1,                                             //分页数据的当前页码
        pageSize: 10,                                               //每页记录数
        isLoading: false,                                          //是否正在加载数据
        finished: false                                            //分页加载完成
    },
    mutations: {
        bindProfitList(state, {res,finished}) {
            state.finished = finished
            state.profitList = res;
        },
        bindTransferDetail(state, {res,finished}) {
            state.finished = finished
            state.transferList = res;
        },
        toggleLoading(state, loading){
            state.isLoading = loading
        },
        resetData(state) {
            state.isLoading = false;
            state.finished = false;
            state.currentPage = 1;
        }
    },
    actions: {
        async getProfitList({ state, commit }, params) {
            await commit('toggleLoading',true)
            const res = [
                {
                    id: 1,
                    username: '一龙',
                    datetime: Date.now(),
                    profit: 0.4,
                    purchase: 23,
                    userAvatar: ''
                },
                {
                    id: 2,
                    username: '二傻',
                    datetime: Date.now(),
                    profit: 100,
                    purchase: 480,
                    userAvatar: ''
                },
                {
                    id: 3,
                    username: '张三',
                    datetime: Date.now(),
                    profit: 120,
                    purchase: 800,
                    userAvatar: ''
                },
                {
                    id: 4,
                    username: '李四',
                    datetime: Date.now(),
                    profit: 53,
                    purchase: 560,
                    userAvatar: ''
                },
                {
                    id: 5,
                    username: '王五',
                    datetime: Date.now(),
                    profit: 84,
                    purchase: 233,
                    userAvatar: ''
                },
                {
                    id: 6,
                    username: '赵六',
                    datetime: Date.now(),
                    profit: 230,
                    purchase: 1200,
                    userAvatar: ''
                }
            ];
            let finished = res.length < state.pageSize
            await commit('bindProfitList', {res,finished});
            commit('toggleLoading',false)
        },
        async getTransferDetail({ state, commit }, params) {
            await commit('toggleLoading',true)
            const res = [
                {
                    id: 1,
                    datetime: Date.now(),
                    profit: 0.4,
                    isAdd: 1
                },
                {
                    id: 2,
                    datetime: Date.now(),
                    profit: 100,
                    isAdd: 1
                },
                {
                    id: 3,
                    datetime: Date.now(),
                    profit: 120,
                    isAdd: 1
                },
                {
                    id: 4,
                    datetime: Date.now(),
                    profit: 53,
                    isAdd: 1
                },
                {
                    id: 5,
                    datetime: Date.now(),
                    profit: 84,
                    isAdd: 1
                },
                {
                    id: 6,
                    datetime: Date.now(),
                    profit: 230,
                    isAdd: 1
                }
            ];
            let finished = res.length < state.pageSize
            await commit('bindTransferDetail', {res,finished});
            commit('toggleLoading',false)
        },
        onDestroy({ commit }) {
            commit('resetData');
        }
    },
    getters: {}
};
