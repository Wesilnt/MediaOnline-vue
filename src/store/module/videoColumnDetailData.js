import { getVideoColumnDetail,
  getLessonListByCourse
} from '../../api/columnsApi.js'

import groupContentData from './groupContentData'
import groupManagerData from './groupManagerData'

const videoColumnDetailData = {
  namespaced: true,
  state: () => {
    return {
      loading: true,
      freeLessonList: [], //试看课程数组
      profilePic: '', //头图
      description: '', //专栏介绍
      outlinePic: '', //课程列表下面的大图展示
      buyIntro: '', //购买须知
      lessonCount: 0, //专栏课集总数
      commentCount: 0, //留言条数
      buyCount: 0, //购买数量
      courseId: 0, //专栏ID
      courseName: '', //专栏名称
      isFromShare: false,
      userAccessStatus:0,
      videoCourseList:[]
    }
  },
  mutations: {
    initDatas(state, courseId) {
      state.courseId = courseId
    },
    bindVideoColumnDetail(state, { result, isFromShare }) {
      state.freeLessonList = result.freeLessonList
      state.description = result.description
      state.outlinePic = result.outlinePic
      state.buyIntro = result.buyIntro
      state.lessonCount = result.lessonCount
      state.commentCount = result.commentCount
      state.buyCount = result.buyCount
      state.courseName = result.name
      state.isFromShare = isFromShare
      state.loading = false
    },
    resetState(state) {
      state.loading = true
    },
    setVideoCourseList(state,videoCourseList){
      state.videoCourseList = videoCourseList
    },
    setUserAccessStatus(state, userAccessStatus){
      state.userAccessStatus = userAccessStatus
    }
  },
  actions: {
    async getVideoCourseList({commit},courseId){
      let result = await getLessonListByCourse({'courseId':courseId,currentPage:1, pageSize:500})
      console.log(result)
      commit('setVideoCourseList',result.result)
    },
    async getVideoColumnDetail({ commit, dispatch }, { courseId, groupBuyId }) {
      //获取视频专栏数据
      const result = await getVideoColumnDetail({ courseId })
      commit('setUserAccessStatus', result.setUserAccessStatus)
      //获取专栏下所有单集
      dispatch('getVideoCourseList',courseId)
      //绑定专栏详情内容
      const profilePic = result.profilePic
      const freeLessonList = result.freeLessonList
      const serviceType = 'OnlineCourse'
      //绑定与拼团相关的内容
      dispatch('groupManagerData/initColumnInfo', {
        serviceType,
        courseId,
        profilePic,
        freeLesson: freeLessonList
      })
      //绑定全局专栏当前详情
      commit('bindCurrentColumn', {columnType:"OnlineCourse" , columnDetail:result},{root:true})
      commit('bindVideoColumnDetail', {result,isFromShare: groupBuyId ? true : false})
      if (groupBuyId) {
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
    }
  },
  modules: {
    groupContentData,
    groupManagerData
  }
}
export default videoColumnDetailData
