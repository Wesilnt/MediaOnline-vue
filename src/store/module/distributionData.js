import {getDistributorInfo,applyDistributor,getDistributorIncomeList,getTransferRecords} from '../../api/distributionApi';

export default {
    namespaced: true,
    state: {
        distributorInfo:{},                                         //分销员信息
        isBindMobile: false,                                       //用户是否绑定手机号
        distributorLevel: 2,                                        //分销员等级
        profitList: [],                                             //收益列表
        transferList: [],                                           //转账列表
        currentPage: 1,                                             //分页数据的当前页码
        pageSize: 10,                                               //每页记录数
        isLoading: false,                                          //是否正在加载数据
        finished: false                                            //分页加载完成
    },
    mutations: {
        setBindMobile(state,data){
          Object.assign(state,data)
        },
        bindDistributorInfo(state, data){
            Object.assign(state,data)
        },
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
        /**获取分销员信息*/
        async getDistributorInfo({ state, commit,dispatch }) {
            const user =  await dispatch('getUserInfo',{forceUpdate:false},{root:true})
            await commit('setBindMobile',{isBindMobile: user && user.mobileNo.length>0})
            const res = await  getDistributorInfo()
            if(!res) return
            commit('bindDistributorInfo',{distributorInfo:res})
        },
        /**申请成为分销员*/
        async applyDistributor({ state, commit,dispatch }, params) {
            const res = await dispatch('myData/applyDistributor',params,{root:true})
            if(!res) return
            await dispatch('getDistributorInfo')  //刷新分销员信息
            return res
        },
        async getProfitList({ state, commit }, refresh) {
            // await commit('toggleLoading',true)
            // let currentPage = refresh ? 1:  state.currentPage + 1
            // let params = {currentPage,pageSize: state.pageSize}
            // const res = await getDistributorIncomeList(params)
            // commit('toggleLoading',false)
            // if(!res) return
            // let data = refresh?res.result: state.profitList.concat(res.result)
            // let finished = data.length >= res.totalCount
            // commit('bindProfitList', {profitList : data ,finished});

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
        async getTransferDetail({ state, commit }, refresh) {
            // await commit('toggleLoading',true)
            // let currentPage = refresh ? 1:  state.currentPage + 1
            // let params = {currentPage,pageSize: state.pageSize}
            // const res = await getTransferRecords(params)
            // commit('toggleLoading',false)
            // if(!res) return
            // let data = refresh?res.result: state.transferList.concat(res.result)
            // let finished = data.length >= res.totalCount
            // commit('bindTransferDetail', {transferList : data ,finished})

            await commit('toggleLoading',true)
            const res = [
                {
                    id: 1,
                    createTime: Date.now(),
                    disUserId: 0,
                    profit: 0.4,
                    status: 1
                },
                {
                    id: 2,
                    createTime: Date.now(),
                    disUserId: 0,
                    profit: 100,
                    status: 1
                },
                {
                    id: 3,
                    createTime: Date.now(),
                    disUserId: 0,
                    profit: 120,
                    status: 1
                },
                {
                    id: 4,
                    createTime: Date.now(),
                    disUserId: 0,
                    profit: 53,
                    status: 1
                },
                {
                    id: 5,
                    createTime: Date.now(),
                    disUserId: 0,
                    profit: 84,
                    status: 1
                },
                {
                    id: 6,
                    datetime: Date.now(),
                    disUserId: 0,
                    profit: 230,
                    status: 1
                }
            ]
            let finished = res.length < state.pageSize
            await commit('bindTransferDetail', {res,finished})
            commit('toggleLoading',false)
        },
        onDestroy({ commit }) {
            commit('resetData')
        }
    },
    getters: {
        noSettlement:state=>state.distributionInfo.noSettlement,                                                        //
        totalIncome:state=>state.distributionInfo.totalIncome,                                                          //总收入
        isDistributor:(state,getters,rootState)=>rootState.myData.isDistributor                                         //是否是分销员
    }
}