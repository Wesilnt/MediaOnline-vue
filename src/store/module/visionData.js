import { getVisionList, getCommentList, getVisionCourseList } from '../../api/visionServiceApi'
import groupManagerData from './groupManagerData'
const visionData = {
    namespaced: true,
    state: {
        bannerPic:'',
        visionList:[],
        currentPage:1,
        totalCount:0,
        pageSize:6,
        showTip:false,
        visionDetail:Object,
        categoryList:[],
        commentList:[],
        finished:false,
        isLoading:false,
        courseName:'',//专栏名称
        userAccessStatus:0,
        isFromShare:false,
        renderLoading:true
    },
    actions:{
        reverse({commit,state}){
            const result =  JSON.parse(JSON.stringify(state.categoryList))
            result.map(item =>{
              item.lessonList.reverse()
            })
            commit('setCategoryList',result.slice().reverse());
        },
        async getCategoryList({commit},courseId){
            let result = await getVisionCourseList({courseId:courseId})
            commit('setCategoryList',result)
        },
      async  getVisionListData({commit,state}){
          await commit('setCurrentPage', 1)
          let result = await getVisionList({currentPage:1, pageSize:state.pageSize, type:1003})
          await commit('setFinished', result.courseInfo.result.length>= state.totalCount);
          commit('setBannerPic', result.bannerPic)
          commit('setVisionList', result.courseInfo.result)
          commit('setTotalCount',result.courseInfo.totalCount)
        },
        async getMoreData({commit, state}){
            commit('setIsLoading',{isLoading:true});
            await commit('setCurrentPage', state.currentPage + 1);
            let result = await getVisionList({currentPage:state.currentPage, pageSize:state.pageSize, type:1003})
            let newList =state.visionList.concat(result.courseInfo.result);
            await commit('setFinished',newList.length>= state.totalCount);
            commit('setIsLoading',{isLoading:false});
            if (newList.length>= state.totalCount) return
            commit('setVisionList', newList)
        },
        async getVisionDetail({state,dispatch,commit},{courseId,groupBuyId}){
            !state.renderLoading && commit('setIsLoading',{renderLoading:true});
            let result = await dispatch('getColumnDetail',{courseId,columnType:'1003'},{root:true})
            console.log('groupBuyId ==',groupBuyId)
            console.log('少年视野专栏数据:')
            console.log(result)
            commit('setVisionDetail', result)
            commit('setIsLoading',{renderLoading:false});
            const profilePic = result.profilePic
            const freeLessonList = result.freeLessonList
            const serviceType = "1003"
            //绑定与拼团相关的内容
            dispatch('groupManagerData/initColumnInfo',{serviceType,courseId,profilePic,'freeLesson':freeLessonList})
            if (state.isFromShare) {
                //这里是分享链接进来的
              dispatch('groupManagerData/getGroupBuyDetail', groupBuyId)
            } else {
                //这里是正常途径进来的
              const toolsData = {
                courseName:result.name,
                courseId:result.id,
                collectLikeDuration: result.collectLikeDuration,
                collectLikeId: result.collectLikeId,
                collectLikePersonCount: result.collectLikePersonCount,
                collectLikeTemplateId: result.collectLikeTemplateId,
                groupBuyDuration: result.groupBuyDuration,
                groupBuyPersonCount: result.groupBuyPersonCount,
                groupBuyPrice: result.groupBuyPrice,
                groupBuyId: result.groupBuyId,
                groupBuyTemplateId: result.groupBuyTemplateId,
                userAccessStatus: result.userAccessStatus,
                price: result.price
              }
              dispatch('groupManagerData/initToolsBar', toolsData)
            }
        },
        async getCommentList({commit},courseId){
            let result = await getCommentList({regionType:2201, regionId:courseId, currentPage:1, pageSize:11})
            commit('setCommentList', result.result)
        },
        async setShareInfo({state,dispatch, rootState}){ 
          //拼装分享内容
          this.shareData = {
            link: this.url + `/#/home/visionDetail/${state.visionDetail.id}`,
            title: state.visionDetail.courseName,
            desc: '你一定会爱上国学课...',
            imgUrl:`${state.visionDetail.sharePostUrl}?imageView2/1/w/100/h/100/format/jpg`,
            successCB: () => console.log('分享回调成功'),
            cancelCB: () => console.log('分享回调失败')
          }
          this.setWxShareFriend(this.shareData)
          this.setWxShareZone(this.shareData) 
        }
    },
    mutations:{
        initDatas(state, { courseId, groupBuyId }) {
            state.courseId = courseId
            state.isFromShare = groupBuyId ? true : false
        },
        setVisionList(state, visionList){
            state.visionList = visionList;
        },
        setBannerPic(state, bannerPic){
            state.bannerPic = bannerPic;
        },
        setCurrentPage(state, currentPage){
            state.currentPage = currentPage;
        },
        setVisionDetail(state, result){
            state.visionDetail = result;
            state.courseName = result.name
            state.userAccessStatus = result.userAccessStatus
        },
        setCommentList(state, commentList){
            state.commentList = commentList;
        },
        setCategoryList(state,categoryList){
            state.categoryList = categoryList;
        },
        setFinished(state,finished){
            state.finished = finished;
        },
        setTotalCount(state,totalCount){
            state.totalCount = totalCount;
        },
        setIsLoading(state,payload){
            Object.assign(state,payload)
        }
    },
    modules:{
      groupManagerData
    }
}

export default visionData
