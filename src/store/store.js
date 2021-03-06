import Vue from 'vue'
import Vuex from 'vuex'
import myPuzzle_PraiseData from './module/myPuzzle_PraiseData'
import homeData from './module/homeData'
import columnData from './module/columnData'
import videoCourseDetailData from './module/videoCourseDetailData'
import audioData from './module/audioData'
import myData from './module/myData'
import myFeedbackData from './module/myFeedbackData'
import mySysMessageData from './module/mySysMessageData'
import myReplyData from './module/myReplyData'
import myLikeData from './module/myLikeData'
import myPlayRecordData from './module/myPlayRecordData'
import myPurchaseData from './module/myPurchaseData'
// import walletData from './module/walletData'
import userInfoData from './module/userInfoData'
import commentData from './module/commentData'
import freezoneData from './module/freezoneData'
import audiotaskData from './module/audioTaskData'
import shareData from './module/shareData'
import praiseData from './module/praiseData'
import mobileData from './module/mobileData'
import columnActions from './column'
import {walletState,walletMutations,walletActions} from './wallet'

import {
  getToken,
  getUserByToken
} from '../api/accessTokenApi'
import { noAccessToken } from '../utils/userAuth'
import { wxConfig as wxConfigApi } from '../api/groupBuyApi.js'
import { stat } from 'fs'

Vue.use(Vuex)
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    // url: encodeURIComponent(location.href.split('#')[0])
    url: window.location.href.split('#')[0],
    wxRegisterPath: '',
    userInfo: null,
    columnDetail: {},
    columnType: null,
    ...walletState
  },
  mutations: {
    saveWxRegisterPath(state, { wxRegisterPath }) {
      state.wxRegisterPath = wxRegisterPath
    },
    saveUserInfo(state, { userInfo }) {
      state.userInfo = userInfo
    },
    //专栏类型 onlineCourse(1005) 在线课堂  onlineVision(1003) 在线视野  reading(1001) 读书会
    bindColumnType(state, { columnType }) {
      state.columnType = columnType
    },
    //设置当前用户选中专栏columnDetail
    bindCurrentColumn(state, { columnDetail }) {
      state.columnDetail = columnDetail
    },
      ...walletMutations
  },
  actions: {
    async getAccessToken() {
      await getToken()
    },
    async checkToken({ dispatch }) {
      noAccessToken() && dispatch('getAccessToken')
    },
    async getUserInfo({ state, commit }, forceUpdate = false) {
      const { userInfo } = state;
      if (userInfo && !forceUpdate) return userInfo;
      const response = await getUserByToken();
      commit('saveUserInfo', { userInfo: response });
      return response
    },
    /** 注入配置信息 */
    async registerWxConfig({ state, commit }, { fullPath, jsApiList = [] }) {
      const { url, wxRegisterPath } = state;
      if (!Array.isArray(jsApiList) || jsApiList.length === 0) {
        throw new Error('[array] jsApiList need');
      }
      if (wxRegisterPath === fullPath) {
        return
      }
      const response = await wxConfigApi({
        url: url
      });
      const {
        appid: appId,
        nonceStr,
        timestamp,
        signature
      } = await response.js_config;
      await wx.config({
        debug: false,
        appId,
        nonceStr,
        timestamp,
        signature,
        jsApiList
      });
      commit('saveWxRegisterPath', {
        wxRegisterPath: fullPath
      })
    },
    //支付
    async wxPayment(
      { state, dispatch },
      { timestamp, nonceStr, packageStr, paySign, successCB, failCB }
    ) {
      let fullPath = window.location.href;
      let jsApiList = ['chooseWXPay'];
      dispatch('registerWxConfig', { fullPath, jsApiList });
      console.log('packageStr = ', packageStr);
      wx.ready(function() {
        wx.chooseWXPay({
          timestamp: timestamp,
          nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
          package: packageStr, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
          signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paySign, // 支付签名
          success: function(res) {
            successCB(res)
          },
          fail: function(errmsg) {
            failCB(errmsg)
          },
          complete: function(res) {
            // successCB(res)
            if (res.errMsg === 'chooseWXPay:cancel') {
              console.log('支付取消')
            }
          }
        })
      })
    },
    async setWxShareFriend(
      { state, dispatch },
      {
        title,
        desc = '秦汉胡同国学，让我们的孩子成为一个有涵养的人',
        link,
        imgUrl = 'http://qiniu.shbaoyuantech.com/FsvTsNINf5rPwNOmQTfe-WSxTSF1?imageView2/1/w/100/h/100/format/jpg',
        type,
        dataUrl,
        successCB = () => {},
        cancelCB = () => {}
      }
    ) {
      // if (!link.includes(state.url)) {
      //   throw new Error('link error');
      // }
      dispatch('getUserInfo').then(user => {
        const shareUrl = `${link}${link.includes('?') ? '&' : '?'}`;
        const distributor = '';//btoa(encodeURIComponent(JSON.stringify({id:user.id,avatarUrl:user.avatarUrl,nickName:user.nickName})));
        link = `${shareUrl}preUserId=${user.id}&distributor=${distributor}`;
        const nickname = user.nickName;
          // user.id
        const shareOptions = {
          title: title || `${nickname}邀请您一起上课啦！`, // 分享标题
          desc, // 分享描述
          link: link || window.location.href, // 分享链接,，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          type, //  分享类型,music、video或link，不填默认为link       *****只对分享给朋友有效*****
          dataUrl, // 如果type是music或video，则要提供数据链接，默认为空      *****只对分享给朋友有效*****
          success: res => successCB(res),
          cancel: res => cancelCB(res)
        };
          console.log('Share-Link:',link);
          wx.ready(() => {
          //分享给朋友
          wx.onMenuShareAppMessage(shareOptions);
          //分享给qq
          wx.onMenuShareQQ(shareOptions)
        })
      })
    },
    async setWxShareZone(
      { state },
      {
        title,
        desc,
        link,
        imgUrl = 'http://qiniu.shbaoyuantech.com/FsvTsNINf5rPwNOmQTfe-WSxTSF1?imageView2/1/w/100/h/100/format/jpg',
        successCB = () => {},
        cancelCB = () => {}
      }
    ) {
      // if (!link.includes(state.url)) {
      //   throw new Error('link error');
      // }
      const shareOptions = {
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接,，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl, // 分享图标
        success: res => successCB(res),
        cancel: res => cancelCB(res)
      };
      wx.ready(() => {
        // 分享到朋友圈
        wx.onMenuShareTimeline(shareOptions);
        // 分享到空间
        wx.onMenuShareQZone(shareOptions);
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
          console.log(res);
          const localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      })
    },
    ...columnActions,
    ...walletActions
  },
  modules: {
    myPuzzle_PraiseData,
    homeData,
    columnData,
    videoCourseDetailData, // 内建 问题列表modul
    myData,
    myFeedbackData,
    mySysMessageData,
    myReplyData,
    myLikeData,
    myPlayRecordData,
    myPurchaseData,
    userInfoData,
    // audio,
    commentData,
    freezoneData,
    audiotaskData,
    audioData,
    shareData,
    praiseData,
    mobileData,
    // walletData
  }
})
