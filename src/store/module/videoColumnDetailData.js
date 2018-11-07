import { getVideoColumnDetail,
  getLessonListByCourse
} from '../../api/columnsApi.js'

import groupContentData from './groupContentData'
import groupManagerData from './groupManagerData'

const videoColumnDetailData = {
  namespaced: true,
  state: {
      loading: true,//控制骨架屏的显示
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
      isFromShare: false,//判断打开专栏页是否来自分享链接
      userAccessStatus:0,//用户和专栏的关系
      videoCourseList:[]//专栏的全部课集列表
  },
  mutations: {
    initDatas(state, { courseId, groupBuyId }) {
      state.courseId = courseId
      state.isFromShare = groupBuyId ? true : false
    },
    bindVideoColumnDetail(state, result) {
      state.freeLessonList = result.freeLessonList
      state.description = result.description
      state.outlinePic = result.outlinePic
      state.buyIntro = result.buyIntro
      state.lessonCount = result.lessonCount
      state.commentCount = result.commentCount
      state.buyCount = result.buyCount
      state.courseName = result.name
      state.userAccessStatus = result.userAccessStatus
      state.loading = false
    },
    resetState(state) {
      state.loading = true
    },
    setVideoCourseList(state,videoCourseList){
      state.videoCourseList = videoCourseList
    }
  },
  actions: {
    async getVideoCourseList({commit},courseId){
      let result = await getLessonListByCourse({'courseId':courseId,currentPage:1, pageSize:500})
      console.log(result)
      commit('setVideoCourseList',result.result)
    },
    async getVideoColumnDetail({ state, commit, dispatch }, { courseId, groupBuyId }) {
      //获取视频专栏数据
      const result = await dispatch('getColumnDetail',{courseId,columnType:'1005'},{root:true}) 
      console.log('专栏数据')   
      console.log(result) 
      //获取专栏下所有单集
      dispatch('getVideoCourseList',courseId)
      if(!result) return
      //绑定业务类型,专栏头图,试听列表,专栏ID到拼团仓库中
      const profilePic = result.profilePic
      const freeLessonList = result.freeLessonList
      // const serviceType = '1005'
  
      dispatch('groupManagerData/initColumnInfo', {
        // serviceType,
        courseId,
        profilePic,
        freeLesson: freeLessonList
      })
      //绑定专栏详情
      commit('bindVideoColumnDetail', result)
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
    }
  },
  modules: {
    groupContentData,
    groupManagerData
  }
}
export default videoColumnDetailData
