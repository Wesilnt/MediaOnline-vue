import Vue from 'vue'
import Vuex from 'vuex'
import myPuzzle_Praise from './module/myPuzzle_Praise'
import columnInfo from './module/columnInfo'
import homeData from './module/homeData'
import videoColumnDetail from './module/videoColumnDetail'
import videoCourseDetail from './module/videoCourseDetail'
import visionData from './module/visionData'
import audio from './module/audioData'
import readings from './module/readingsData'
import myData from './module/myData'
import myFeedback from './module/myFeedback'
import mySysMessage from './module/mySysMessage'
import myReply from './module/myReply'
import myLike from './module/myLike'
import myPlayRecord from './module/myPlayRecord'
import myPurchase from './module/myPurchase'
import userInfo from './module/userInfo'
import comment from './module/commentData'
import freezone from './module/freezoneData'
import audiotask from './module/audioTask'
import share from './module/shareData'
import praise from './module/praiseData'
import mobile from './module/mobileData'

import { getToken } from '../services/accessToken'
import { noAccessToken } from '../utils/userAuth'
import { wxConfig as wxConfigApi } from '../services/groupBuyAPi.js'

const { NODE_ENV } = process.env
let wxConfigUrl = 'http://tencent.test.shbaoyuantech.com/wechat-js-config/online'
if (NODE_ENV === 'development') {
  wxConfigUrl = 'http://tencent.test.shbaoyuantech.com/wechat-js-config/online'
}

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // url: encodeURIComponent(location.href.split('#')[0])
    url: window.location.href.split('#')[0],
    wxRegisterPath: ''
  },
  mutations: {
    saveWxRegisterPath(state, { wxRegisterPath }) {
      state.wxRegisterPath = wxRegisterPath
    }
  },
  actions: {
    async getAccessToken() {
      await getToken()
    },
    async checkToken({ dispatch }) {
      noAccessToken() && dispatch('getAccessToken')
    },
    /** 注入配置信息 */
    async registerWxConfig({ state, commit }, { fullPath, jsApiList = [] }) {
      const { url, wxRegisterPath } = state
      if (!Array.isArray(jsApiList) || jsApiList.length === 0) {
        throw new Error('[array] jsApiList need')
        return
      }
      if (wxRegisterPath === fullPath) {
        console.log('微信config已启用成功')
        return
      }
      const response = await wxConfigApi({
        url: url
      })
      const {
        appid: appId,
        nonceStr,
        timestamp,
        signature
      } = await response.js_config
      await wx.config({
        debug: true,
        appId,
        nonceStr,
        timestamp,
        signature,
        jsApiList
      })
      commit('saveWxRegisterPath', {
        wxRegisterPath: fullPath
      })
    },
    //支付
    async wxPayment({state},{timestamp,nonceStr,packageStr,paySign,successCB,failCB}){
      let fullPath = window.location.href
      let jsApiList = ['chooseWXPay']
      dispatch('registerWxConfig',{fullPath,jsApiList})   
      wx.ready(function(){
        wx.chooseWXPay({
            timestamp: timestamp,
            nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
            package: packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: paySign, // 支付签名
            success: function (res) {
              successCB(res)
            },
            fail : function (errmsg) {
              failCB(res)
            },
            complete : function (res) {
              if(res.errMsg == "chooseWXPay:cancel" ) {
                console.log('支付取消')
              } 
            }
        }); 
      })
    },
    async setWxShareFriend(
      { state },
      {
        title,
        desc,
        link,
        imgUrl,
        type,
        dataUrl,
        successCB = () => {},
        cancelCB = () => {}
      }
    ) {
      if (!link.includes(state.url)) {
        throw new Error('link error')
        return
      }
      const shareOptions = {
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接,，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        type, //  分享类型,music、video或link，不填默认为link       *****只对分享给朋友有效*****
        dataUrl, // 如果type是music或video，则要提供数据链接，默认为空      *****只对分享给朋友有效*****
        success: res => successCB(res),
        cancel: res => cancelCB(res)
      }
      wx.ready(() => {
        // 分享给朋友
        wx.onMenuShareAppMessage(shareOptions)
        // 分享给qq
        wx.onMenuShareQQ(shareOptions)
      })
    },
    async setWxShareZone(
      { state },
      { title, desc, link, imgUrl, successCB = () => {}, cancelCB = () => {} }
    ) {
      if (!link.includes(state.url)) {
        throw new Error('link error')
        return
      }
      const shareOptions = {
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接,，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: res => successCB(res),
        cancel: res => cancelCB(res)
      }
      wx.ready(() => {
        // 分享到朋友圈
        wx.onMenuShareTimeline(shareOptions)
        // 分享到空间
        wx.onMenuShareQZone(shareOptions)
        // 分享到微博
        wx.onMenuShareWeibo(shareOptions)
      })
    },
    async wxChooseImage({ current = '', urls = [] }) {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          console.log(res)
          const localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      })
    }
  },
  modules: {
    myPuzzle_Praise,
    homeData,
    columnInfo,
    videoColumnDetail,
    videoCourseDetail, // 内建 问题列表modul
    myData,
    myFeedback,
    mySysMessage,
    myReply,
    myLike,
    myPlayRecord,
    myPurchase,
    userInfo,
    visionData,
    readings,
    // audio,
    comment,
    freezone,
    audiotask,
    share,
    praise,
    mobile
  }
})
