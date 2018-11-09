import {
  getVisionCourseList,
  getLessonListByCourse,
  getColumns
} from '../../api/columnsApi.js'
import { getCommentList, likeComment } from '../../api/commentApi.js'
import { columnType as ColumnType } from '../../utils/config'
import payment from './payment'

const columnData = {
  namespaced: true,
  state() {
    return {
      //-3 拼团失败 0 默认状态 1001 单购成功 1003 拼团成功 1005拼团中 1007集赞成功未领取 1008集赞成功已领取 1009集赞中
      userAccessStatus: null, //当前用户与专栏之间的关系
      collectLikeId: null,
      groupBuyId: null,
      isFromShare: false, //是否来自分享
      renderLoading: true, //控制骨架屏的显示
      pageSize: 10,
      buyCount: 0, //购买数量
      courseName: '',
      //专栏列表页
      profilePic: null,
      bannerPic: '', //专栏列表页的头图
      columnLoading: false, //控制单集列表分页
      columnCurrentPage: 0,
      columnList: [], //专栏列表
      columnFinished: false, //分页数据是否加载完成
      //专栏详情页
      lessonLoading: false, //控制专栏列表分页
      lessonCurrentPage: 1,
      lessonFinished: false, //分页数据是否加载完成
      columnDetail: {}, //专栏对象
      courseId: 0, //专栏ID
      lessonList: [], //单集列表分类
      columnComments: [], //视频专栏留言数组
      commentsTotalCount: 0 //精选留言总数
    }
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
    freeLesson: function({ columnDetail }) {
      const { freeLessonList } = columnDetail
      return freeLessonList && freeLessonList.length ? freeLessonList[0] : false //试听试看课程
    },
    playingId: (state, getters, rootState) => {
      return rootState.audiotaskData.audioDetail.id
    },
    isNew: function(state) {
      // 小於一個月標志上新
      return (
        new Date().getTime() -
          new Date(state.columnDetail.createTime).getTime() <
        30 * 24 * 3600 * 1000
      )
    }
  },
  mutations: {
    saveStatus(state, payload) {
      Object.assign(state, payload)
    },
    //更新播放列表是否点赞字段
    updateUserCommentLikeId(state, payload) {
      state.videoColumnComments.forEach(element => {
        if (element.id == payload) {
          element.userCommentLikeId = '1'
        }
      })
    }
  },
  actions: {
    //少年视野的分类列表排序
    reverse({ commit, state }) {
      const result = JSON.parse(JSON.stringify(state.lessonList))
      result.map(item => {
        item.lessonList.reverse()
      })
      const lessonList = result.slice().reverse()
      commit('saveStatus', { lessonList })
    },
    //获取少年视野的分类列表
    async getCategoryList({ commit }, courseId) {
      const lessonList = await getVisionCourseList({ courseId })
      commit('saveStatus', { lessonList })
    },
    //获取专栏下单集列表
    async getLessonList({ commit, state }, { courseId, refresh }) {
      if (state.lessonFinished || state.lessonLoading) return
      commit('saveStatus', { lessonLoading: true })
      const pageSize = refresh
        ? state.pageSize
        : state.pageSize * (state.lessonCurrentPage + 1)
      const res = await getLessonListByCourse({
        courseId: courseId,
        currentPage: state.lessonCurrentPage,
        pageSize
      })
      if (!res) return
      const isFinished = res.result.length >= res.totalCount
      commit('saveStatus', {
        lessonLoading: false,
        lessonList: res.result,
        pageSize,
        lessonFinished: isFinished
      })
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
      if (!result) return
      if (refresh) {
        let isFinished =
          result.courseInfo.result.length >= result.courseInfo.totalCount
        commit('saveStatus', {
          bannerPic: result.bannerPic,
          columnLoading: false,
          columnList: result.courseInfo.result,
          columnCurrentPage: page,
          pageSize: state.pageSize,
          columnFinished: isFinished
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
      { courseId, columnType }
    ) {
      //获取视频专栏数据
      const columnDetail = await dispatch(
        'getColumnDetail',
        { courseId, columnType },
        { root: true }
      )
      if (!columnDetail) return
      //绑定业务类型,专栏头图,试听列表,专栏ID到拼团仓库中
      const {
        name: courseName,
        profilePic,
        buyCount,
        userAccessStatus,
        collectLikeId,
        groupBuyId
      } = columnDetail
      //绑定专栏详情
      commit('saveStatus', {
        columnDetail,
        buyCount,
        userAccessStatus,
        collectLikeId,
        groupBuyId,
        renderLoading: false,
        profilePic,
        courseName
      })
    },
    async getCommentList({ commit }, params) {
      const response = await getCommentList(params)
      commit('saveStatus', {
        columnComments: response.result,
        commentsTotalCount: response.totalCount
      })
    },
    async likeComment({ commit, state }, commentId) {
      const result = await likeComment({ commentId: commentId })
      if (!result) return
      commit('updateUserCommentLikeId', result.commentId)
    },
    resetState({ commit }) {
      commit('saveStatus', {
        //-3 拼团失败 0 默认状态 1001 单购成功 1003 拼团成功 1005拼团中 1007集赞成功未领取 1008集赞成功已领取 1009集赞中
        userAccessStatus: null, //当前用户与专栏之间的关系
        collectLikeId: null,
        groupBuyId: null,
        isFromShare: false, //是否来自分享
        renderLoading: true, //控制骨架屏的显示
        pageSize: 10,
        buyCount: 0, //购买数量
        courseName: '',
        //专栏列表页
        profilePic: null,
        bannerPic: '', //专栏列表页的头图
        columnLoading: false, //控制单集列表分页
        columnCurrentPage: 0,
        columnList: [], //专栏列表
        columnFinished: false, //分页数据是否加载完成
        //专栏详情页
        lessonLoading: false, //控制专栏列表分页
        lessonCurrentPage: 1,
        lessonFinished: false, //分页数据是否加载完成
        columnDetail: {}, //专栏对象
        courseId: 0, //专栏ID
        lessonList: [], //单集列表分类
        columnComments: [], //视频专栏留言数组
        commentsTotalCount: 0 //精选留言总数
      })
    }
  },
  modules: {
    payment
  }
}

export default columnData
