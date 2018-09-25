import request from './request'
import { stringify } from 'qs'
import wxConfigURI from '../api/wxConfig'

/** 注入配置信息 */
export const wxConfig = () => {
  const params = {
    url: encodeURIComponent(location.href.split('#')[0])
  }
  request(`${wxConfigURI}?${stringify(params)}`).then(res => {
    const configs = res.js_config
    wx.config({
      debug: false,
      appId: configs.appid,
      nonceStr: configs.nonceStr,
      timestamp: configs.timestamp,
      signature: configs.signature,
      jsApiList: [
        'hideMenuItems',
        'previewImage',
        'checkJsApi',
        'chooseWXPay',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'getLocation',
        'openLocation',
        'translateVoice'
      ]
    })
  })
}

/**
 * wxShare 分享
 * @param option
 */
export const wxShare = (option, successCB) => {
  wx.ready(() => {
    // 分享给朋友
    wx.updateAppMessageShareData({
      title: option.title,
      desc: option.desc,
      link: option.link,
      imgUrl: option.imgUrl,
      success: function(res) {
        // 用户确认分享后执行的回调函数
        successCB(res)
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    })

    // 分享到朋友圈
    wx.updateTimelineShareData({
      title: option.friendtitle || option.title, // 标题
      desc: option.desc,
      link: option.link, // 链接
      imgUrl: option.imgUrl, // 分享图标
      success: function(res) {
        successCB(res)
      },
      cancel: function() {
        // 用户取消分享后执行的回调函数
      }
    })
  })
}

export const wxDisabledShare = () => {
  wx.ready(() => {
    wx.hideMenuItems({
      menuList: [
        'menuItem:share:appMessage',
        'menuItem:share:timeline',
        'menuItem:share:qq',
        'menuItem:share:weiboApp',
        'menuItem:share:QZone'
      ]
    })
  })
}

/**
 * wxGetLocation 获取地理位置
 * @returns {{}} location  经纬度
 */
export const wxGetLocation = (cb = () => {}) => {
  wx.ready(() => {
    wx.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: function(res) {
        // const latitude = res.latitude        // 纬度，浮点数，范围为90 ~ -90
        // const longitude = res.longitude      // 经度，浮点数，范围为180 ~ -180。
        cb(res)
      },
      cancel: function() {
        cb()
      },
      fail: function() {
        cb()
      }
    })
  })
}

/**
 *
 * @param source
 * @param option
 */
export const wechatShare = async (option = {}, successCB = () => {}) => {
  let nickname = ''
  await getSelfInfoWithServices().then(selfInfo => {
    nickname = selfInfo.profile.nickname || ''
  })

  const shareOption = {
    link: location.href.split('#')[0],
    title: `${nickname}邀请您一起上课啦！`,
    friendtitle: `${nickname}邀请您一起上课啦！`,
    desc: '秦汉胡同国学，让我们的孩子成为一个有涵养的人',
    imgUrl: 'http://qiniu.shbaoyuantech.com/yueke_share.jpeg',

    ...option
  }
  wxConfig()
  wxShare(shareOption, successCB)
}

/**
 * wxPreviewImage 预览图片
 */
export const wxPreviewImage = option => {
  const previewOption = {
    current: '', // 当前显示图片的http链接
    urls: [], // 需要预览的图片http链接列表

    ...option
  }
  wx.previewImage(previewOption)
}
