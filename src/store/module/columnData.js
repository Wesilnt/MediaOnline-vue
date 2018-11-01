import {
  getVisionCourseList,
  getLessonListByCourse,
  getColumns
} from '../../api/columnsApi.js'
import { columnType as ColumnType } from '../../utils/config'

import groupContentData from './groupContentData'
import groupManagerData from './groupManagerData'

const columnData = {
  namespaced: true,
  state: {
    //-3 拼团失败 0 默认状态 1001 单购成功 1003 拼团成功 1005拼团中 1007集赞成功未领取 1008集赞成功已领取 1009集赞中
    userAccessStatus: 0, //当前用户与专栏之间的关系
    isFromShare: false, //是否来自分享
    renderLoading: true, //控制骨架屏的显示
    pageSize: 10,
    buyCount: 0, //购买数量
    //专栏列表页
    bannerPic: '', //专栏列表页的头图
    columnLoading: false, //控制单集列表分页
    columnCurrentPage: 0,
    columnList: [], //专栏列表
    columnFinished: false, //分页数据是否加载完成
    //专栏详情页
    lessonLoading: false, //控制专栏列表分页
    lessonCurrentPage: 0,
    lessonFinished: false, //分页数据是否加载完成
    columnDetail: {}, //专栏对象
    courseId: 0, //专栏ID
    lessonList: [], //单集列表/视频和读书会
    categoryList: [], //少年视野专栏下的分类
    freeLessonList: [] //试听试看课程数组
  },
  getters: {
    getBookIntroduce: function(state) {
      return {
        name: state.columnDetail.name, //单集名称
        coverPic: state.columnDetail.coverPic, //封面图
        profilePic: state.columnDetail.profilePic, //介绍图
        authorBriefIntro: state.columnDetail.authorIntro, //作者介绍
        radioIntro: state.columnDetail.commentatorIntro, //播讲者介绍
        description: state.columnDetail.description //内容介绍
      }
    },
    playingId: (state, getters, rootState) =>
      rootState.audiotaskData.audioDetail.id
  },
  mutations: {
    //初始化数据
    initDatas(state, { courseId, groupBuyId }) {
      state.courseId = courseId
      state.isFromShare = groupBuyId ? true : false
    },
    saveStatus(state, payload) {
      Object.assign(state, payload)
    },
    resetState(state) {
      ;(state.renderLoading = true),
        (state.columnCurrentPage = 0),
        (state.columnLoading = false),
        (state.columnFinished = false),
        (state.columnList = []),
        (state.lessonCurrentPage = 0),
        (state.lessonLoading = false),
        (state.lessonFinished = false),
        (state.lessonList = []),
        (state.categoryList = []),
        (state.freeLessonList = []),
        (state.courseId = 0),
        (state.userAccessStatus = 0),
        (state.isFromShare = false),
        (state.buyCount = 0),
        (state.columnDetail = {})
    }
  },
  actions: {
    //少年视野的分类列表排序
    reverse({ commit, state }) {
      const result = JSON.parse(JSON.stringify(state.categoryList))
      result.map(item => {
        item.lessonList.reverse()
      })
      const categoryList = result.slice().reverse()
      commit('saveStatus', { categoryList })
    },
    //获取少年视野的分类列表
    async getCategoryList({ commit }, courseId) {
      const categoryList = await getVisionCourseList({ courseId })
      commit('saveStatus', { categoryList })
    },
    //获取专栏下单集列表
    async getLessonList({ commit, state }, { courseId, refresh }) {
      if (state.lessonFinished || state.lessonLoading) return
      commit('saveStatus', { lessonLoading: true })
      const page = refresh ? 1 : state.lessonCurrentPage + 1
      const res = await getLessonListByCourse({
        courseId: courseId,
        currentPage: page,
        pageSize: state.pageSize
      })
      if (!res) return
      if (refresh) {
        commit('saveStatus', {
          lessonLoading: false,
          lessonList: res.result,
          lessonCurrentPage: page
        })
      } else {
        const tempLessons = state.lessonList.concat(res.result)
        const isFinished = tempLessons.length >= res.totalCount
        commit('saveStatus', {
          lessonLoading: false,
          lessonList: tempLessons,
          lessonCurrentPage: page,
          lessonFinished: isFinished
        })
      }
    },
    //获取专栏列表
    async getColumnList({ commit, state }, { refresh, columnType }) {
      if (state.columnFinished || state.columnLoading) return
      commit('saveStatus', { columnLoading: true })
      const page = refresh ? 1 : state.columnCurrentPage + 1
      const result = await getColumns({
        type: ColumnType[columnType].code,
        currentPage: page,
        pageSize: state.pageSize
      })
      console.log(result)
      if (!result) return
      if (refresh) {
        commit('saveStatus', {
          bannerPic: result.bannerPic,
          columnLoading: false,
          columnList: result.courseInfo.result,
          columnCurrentPage: page,
          pageSize
        })
      } else {
        const tempColumns = state.columnList.concat(result.courseInfo.result)
        let isFinished = tempColumns.length >= result.courseInfo.totalCount
        commit('saveStatus', {
          bannerPic: result.bannerPic,
          columnLoading: false,
          columnList: tempColumns,
          columnCurrentPage: page,
          columnFinished: isFinished
        })
      }
    },
    //获取专栏详情
    async getColumnDetail(
      { state, commit, dispatch },
      { courseId, groupBuyId, columnType }
    ) {
      //获取视频专栏数据
      const columnDetail = await dispatch(
        'getColumnDetail',
        { courseId, columnType },
        { root: true }
      )
      console.log(columnDetail)
      if (!columnDetail) return
      //绑定业务类型,专栏头图,试听列表,专栏ID到拼团仓库中
      const profilePic = columnDetail.profilePic
      const freeLessonList = columnDetail.freeLessonList
      const buyCount = columnDetail.buyCount
      const userAccessStatus = columnDetail.userAccessStatus
      const renderLoading = false
      dispatch('groupManagerData/initColumnInfo', {
        courseId,
        profilePic,
        freeLesson: freeLessonList
      })
      //绑定专栏详情
      commit('saveStatus', {
        columnDetail,
        buyCount,
        userAccessStatus,
        renderLoading
      })
      if (state.isFromShare) {
        //这里是分享链接进来的
        dispatch('groupManagerData/getGroupBuyDetail', groupBuyId)
      } else {
        //这里是正常途径进来的
        const toolsData = {
          courseName: columnDetail.name,
          courseId: columnDetail.id,
          collectLikeDuration: columnDetail.collectLikeDuration,
          collectLikeId: columnDetail.collectLikeId,
          collectLikePersonCount: columnDetail.collectLikePersonCount,
          collectLikeTemplateId: columnDetail.collectLikeTemplateId,
          groupBuyDuration: columnDetail.groupBuyDuration,
          groupBuyPersonCount: columnDetail.groupBuyPersonCount,
          groupBuyPrice: columnDetail.groupBuyPrice,
          groupBuyId: columnDetail.groupBuyId,
          groupBuyTemplateId: columnDetail.groupBuyTemplateId,
          userAccessStatus: columnDetail.userAccessStatus,
          price: columnDetail.price
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

export default columnData
