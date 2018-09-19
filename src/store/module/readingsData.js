import { getReadingsList, getBookDetail, getSingleSetList } from '../../services/readingsApi'
export default {
    namespaced: true,
    state: {
        pageSize : 10,
        currentPage:1,
        finished:false,  //分页数据是否加载完成
        loading:false,   //加载中
        bannerPic: {}, //专栏头图
        bookList: [], //书列表 
        bookDetail: {}, //书详情
        singleSetList: [] //单集列表
    },
    mutations: {
        bindReadingsList(state, {res,page}) {
            state.bannerPic = res.bannerPic
            state.currentPage = page
            state.finished = res.courseInfo.result.length < state.pageSize 
            state.loading = false
            if(1==page) state.bookList = []
            state.bookList = state.bookList.concat(res.courseInfo.result)  
        },
        bindBookDetail(state, res) {
            state.bookDetail = res
        },
        bindSingleSetList(state, res) {
            state.singleSetList = res.result
        },
        toggleLoading(state, isLoading){
           state.loading = isLoading
        }
    },
    actions: {
        //读书会-书列表
        async getReadingsList({state, commit },refresh) {
           commit('toggleLoading',true)
            let page  = refresh ? 1 : state.currentPage + 1
            const res = await getReadingsList({ type: 1007, currentPage: page, pageSize: state.pageSize })
            console.log(res)
            commit("bindReadingsList", {res, page})
        },
        //书详情
        async getBookDetail({ commit }, params) {
            const res = await getBookDetail(params)
            console.log(res)
            commit("bindBookDetail", res)
        },
        //书单集列表
        async getSingleSetList({ commit }, params) {
            const res = await getSingleSetList(params)
            console.log(res)
            commit("bindSingleSetList", res)
        }
    },
    getters: {
        //获取
        getBookIntroduce:function(state) { 
            return {
                name: state.bookDetail.name,                         //单集名称
                coverPic: state.bookDetail.coverPic,                 //封面图
                profilePic: state.bookDetail.profilePic,             //介绍图
                authorBriefIntro:state.bookDetail.authorIntro,       //作者介绍
                radioIntro:state.bookDetail.commentatorIntro,        //播讲者介绍  
                description:state.bookDetail.description,            //内容介绍
            }
        },
      playingId:(state,getters,rootState)=>rootState.audiotask.audioDetail.id
    }
}