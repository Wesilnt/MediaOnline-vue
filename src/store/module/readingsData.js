import { getReadingsList, getBookDetail, getSingleSetList } from '../../services/readingsApi'
import groupManager from './groupManager'

export default {
    namespaced: true,
    state: {
        courseId:0,
        pageSize : 10,
        currentPage:1,
        finished:false,  //分页数据是否加载完成
        loading:false,   //加载中
        bannerPic: {}, //专栏头图
        bookList: [], //书列表 
        bookDetail: {}, //书详情
        singleSetList: [], //单集列表
        singleFinished:false,
        singleLoaing:false,
    },
    mutations: {
        initData(state,courseId){
          state.courseId = courseId
          state.singleFinished = false
          state.singleLoaing = false
          state.currentPage = 1
          state.singleSetList = []
        },
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
        bindSingleSetList(state, {res,page,totalCount}) { 
          if(1==page) state.singleSetList = []
          state.singlePage = page
          state.singleLoaing = false
          state.singleSetList = state.singleSetList.concat(res.result) 
          state.singleFinished = state.singleSetList.length >= totalCount
        },
        toggleLoading(state, isLoading){
           state.loading = isLoading
        },
        setSingleLaoding(state, isLoading){
           state.singleLoaing = isLoading
        }
    },
    actions: {
        //读书会-书列表
        async getReadingsList({state, commit },refresh) {
          if(state.loading || state.finished)return
           commit('toggleLoading',true)
            let page  = refresh ? 1 : state.currentPage + 1
            const res = await getReadingsList({ type: 1007, currentPage: page, pageSize: state.pageSize })
            console.log(res)
            let totalCount = res.totalCount
            commit("bindReadingsList", {res, page,totalCount})
        },
        //书详情
        async getBookDetail({dispatch, commit }, params) {
            const res = await getBookDetail(params) 
            console.log(res)
            commit("bindBookDetail", res)

          //设置底部购买工具栏
            const toolsData = {
              "collectLikeDuration" : res.collectLikeDuration,
              "collectLikeId" : res.collectLikeId,
              "collectLikePersonCount" : res.collectLikePersonCount,
              "collectLikeTemplateId" : res.collectLikeTemplateId,
              "groupBuyDuration" : res.groupBuyDuration,
              "groupBuyPersonCount" : res.groupBuyPersonCount,
              "groupBuyPrice" : res.groupBuyPrice,
              "groupBuyId": params.groupBuyId || res.groupBuyId,
              "groupBuyTemplateId" : res.groupBuyTemplateId,
              "userAccessStatus" : res.userAccessStatus
          }
          dispatch('groupManager/initToolsBar',toolsData)

        },
        //书单集列表
        async getSingleSetList({state, commit }, refresh) {
            if(state.singleFinished || state.singleLoaing)return
            await commit('setSingleLaoding',true)
            let page = refresh?1:state.singlePage + 1
            let params = {
              courseId:state.courseId,
              currentPage:page,
              pageSize:state.pageSize
            } 
            const res = await getSingleSetList(params)
            if(null == res) return 
            console.log(res)
            let totalCount = res.totalCount
            commit("bindSingleSetList", {res,page,totalCount})
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
    },
    modules:{
      groupManager
    }
}