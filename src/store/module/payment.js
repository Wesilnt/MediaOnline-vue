import { Toast } from 'vant'
import { WECHAT_SUBSCRIPTION_URL } from '../../utils/config'
import {
  getGroupBuyDetail, // 获取拼团详情
  startGroupBuy, //发起拼团
  joinGroupBuy, //参与拼团
  startCollectLike, // 发起集赞
  getCollectLike, // 领取集赞
  unlockCourse, // （单购）解锁课程
  wechatSubscribed // 判断用户是否关注公众号
} from '../../api/groupBuyApi.js'

const formatPrice = price => {
  if (!price) return null
  if (price.toString().indexOf('.') !== -1) return price
  else return price + '.00'
}

let toast = null
export default {
  namespaced: true,
  name: 'payment',
  state: () => ({
    masterId: '',
    starterUid: '',
    userList: [],
    timeDuration: null,
    alreadyCount: 0,
    groupBuystatus: 0,
    toast: null
  }),
  getters: {
    groupBuyTemplateId(state, getters, { columnData }) {
      return columnData.columnDetail.groupBuyTemplateId
    },
    collectLikeTemplateId(state, getters, { columnData }) {
      return columnData.columnDetail.collectLikeTemplateId
    },
    sharePostUrl(state, getters, { columnData }) {
      return `${
        columnData.columnDetail.sharePostUrl
      }?imageView2/1/w/100/h/100/format/jpg`
    },
    groupBuyPrice(state, getters, { columnData }) {
      return formatPrice(columnData.columnDetail.groupBuyPrice)
    },
    price(state, getters, { columnData }) {
      return formatPrice(columnData.columnDetail.price)
    },
    groupBuyPersonCount(state, getters, { columnData }) {
      return columnData.columnDetail.groupBuyPersonCount
    },
    freeLesson(state, getters, { columnData }) {
      const { freeLessonList } = columnData.columnDetail
      return freeLessonList && freeLessonList.length && freeLessonList[0]
    },
    courseName(state, getters, { columnData }) {
      return columnData.courseName
    },
    purchased(state, getters, { columnData }) {
      return columnData.lessonList[0]
    }
  },
  mutations: {
    saveState(state, payload) {
      Object.assign(state, payload)
    }
  },
  actions: {
    async getGroupBuyDetail({ commit }, payload) {
      const response = await getGroupBuyDetail(payload)
      if (!response) return
      const {
        userId: masterId,
        starterUid,
        userList,
        createTime,
        duration,
        sysTime,
        alreadyCount,
        status: groupBuystatus
      } = response

      //8.计算倒计时
      const timeDuration =
        (createTime + duration * 60 * 60 * 1000 - sysTime) / 1000

      commit('saveState', {
        masterId,
        starterUid,
        userList,
        timeDuration,
        alreadyCount,
        groupBuystatus
      })
    },
    hideToast() {
      toast.clear()
    },
    resetState({commit}) {
      commit('saveState', {
        masterId: '',
        starterUid: '',
        userList: [],
        timeDuration: null,
        alreadyCount: 0,
        groupBuystatus: 0,
        toast: null
      })
    },
    //验证是否完成了公众号授权
    async checkoutWxAuthor() {
      toast = Toast('请等待操作...')
      const result = await wechatSubscribed()
      if (result != 1) {
        //跳转去关注公众号
        toast.clear()
        return (window.location.href = WECHAT_SUBSCRIPTION_URL)
      }
    },
    checkoutUserInfo({ dispatch }, forceUpdate) {
      return dispatch('getUserInfo', forceUpdate, { root: true })
    },
    //原价购买
    async unlockCourse({ dispatch }, payload) {
      const result = await unlockCourse(payload)
      if (!result) return
      dispatch('getWechatPayment', { ...result, ...payload })
    },
    //发起拼团
    async startGroupBuy({ commit, dispatch }, payload) {
      const result = await startGroupBuy(payload)
      if (!result) return
      dispatch('getWechatPayment', { ...result, ...payload })
    },
    //参与拼团
    async joinGroupBuy({ dispatch, commit }, { groupBuyId, courseId }) {
      const result = await joinGroupBuy({ groupBuyId })
      if (!result) return
      dispatch('getWechatPayment', { ...result, courseId }).then(res => {
        console.log(res)
      })
    },
    //发起集赞
    async startCollectLike({ state, dispatch, commit }, { courseId }) {
      const result = await startCollectLike({ courseId })
      if (!result) return
      Toast('发起集赞成功')
      dispatch('columnData/getColumnDetail', { courseId }, { root: true })
    },
    //领取集赞
    async getCollectLike({ dispatch, commit }, { collectLikeId, courseId }) {
      const result = await getCollectLike({ collectLikeId })
      if (!result) return
      Toast('领取集赞成功')
      dispatch('columnData/getColumnDetail', { courseId }, { root: true })
    },
    //调起微信支付
    async getWechatPayment(
      { commit, dispatch },
      { timestamp, nonceStr, package: packageStr, paySign, courseId }
    ) {
      await dispatch(
        'wxPayment',
        {
          timestamp,
          nonceStr, // 支付签名随机串，不长于 32 位
          packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign, // 支付签名
          successCB: function(res) {
            console.log(res)
            // if (res.errMsg !== 'chooseWXPay:cancel')
            // 支付成功后的回调函数
            dispatch('columnData/getColumnDetail', { courseId }, { root: true })
            return res
          },
          failCB: function() {
            Toast.fail('支付失败')
          }
        },
        { root: true }
      )
    }
  }
}
