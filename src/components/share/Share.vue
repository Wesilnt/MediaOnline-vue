<template>
  <div v-show="show" class="share-container">
    <transition @after-leave="afterLeave">
      <div v-show="isOpen" class="share-content">
        <div class="share-src">
          此网页由www.shbaoyuantech.com提供
        </div>
        <div class="share-list">
          <router-link class="share-item" :to="'/share/poster/'+shareid+'?sharetype='+sharetype" tag="div">
            <div class="share-icon">
              <img src="../../assets/share_poster.png">
            </div>
            <span class="share-label">生成海报</span>
          </router-link>
          <div class="share-item" @click="onShareItem('friends')">
            <div class="share-icon">
              <img src="../../assets/share_friends.png">
            </div>
            <span class="share-label">发送给朋友</span>
          </div>
          <div class="share-item" @click="onShareItem('circle')">
            <div class="share-icon">
              <img src="../../assets/share_circle.png">
            </div>
            <span class="share-label">分享到朋友圈</span>
          </div>
        </div>
        <div class="share-cancel" @click="onCancel">
          取消
        </div>
      </div>
    </transition>
  </div>
</template>
 <script>
import { wxConfig, wechatShare } from '../../utils/wxConfig.js'
export default {
  props: ['show', 'sharetype', 'shareid'],
  data() {
    return {
      isOpen: false
    }
  },
  watch: {
    show(value) {
      this.isOpen = value
    }
  },
      mounted() {
        this.config();
       
    },
  methods: {
    async config(){
  let result0= await wxConfig({'url' : window.location.href})
 console.log('config' +result0);
        let config = result0.js_config
        console.log('嫩不能走到这里')
        console.log(result0)
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: config.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: config.timestamp, // 必填，生成签名的时间戳
          nonceStr: config.nonceStr, // 必填，生成签名的随机串
          signature: config.signature, // 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
    },
    onShareItem(shareScore) {
      this.isOpen = false
      if (shareScore == 'poster') {
        this.$toast('分享海报')
      }
      if (shareScore == 'friends') {
        this.$toast('分享给朋友')
        let nickname = 'nihao'
        const shareOption = {
          link: location.href.split('#')[0],
          title: `${nickname}邀请您一起上课啦！`,
          friendtitle: `${nickname}邀请您一起上课啦！`,
          desc: '秦汉胡同国学，让我们的孩子成为一个有涵养的人',
          imgUrl: 'http://qiniu.shbaoyuantech.com/yueke_share.jpeg'
        }
        wx.ready(function(shareOption) {
          wx.onMenuShareAppMessage({
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
        })
      }
      if (shareScore == 'circle') {
        this.$toast('分享到朋友圈')
      }
    },

    onCancel() {
      this.isOpen = false
    },
    afterLeave(el) {
      this.$emit('close')
    }
  }
}
</script>
 <style lang="scss" scoped>
.share-container {
  top: 0;
  position: fixed;
  z-index: 2004;
  width: 100%;
  background-color: rgba(00, 00, 00, 0.5);
  height: 100%;
  .share-content {
    position: fixed;
    background-color: #e1d9d5;
    width: 100%;
    bottom: 0;
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease;
    .share-src {
      font-size: 24px;
      color: rgb(82, 82, 77);
      text-align: center;
      margin-top: 16px;
    }
    .share-list {
      display: flex;
      flex-direction: row;
      padding-left: 6px;
      margin-top: 50px;
    }
    .share-item {
      margin-left: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .share-icon {
        background-color: rgb(247, 247, 245);
        height: 120px;
        width: 120px;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .share-label {
        margin-top: 20px;
        color: rgb(82, 81, 77);
        font-size: 24px;
      }
    }
  }
  .share-cancel {
    margin-top: 62px;
    height: 98px;
    background-color: white;
    font-size: 36px;
    color: rgb(38, 38, 38);
    text-align: center;
    line-height: 98px;
  }
  //   .share-hide {
  //     margin-bottom: -100%;
  //   }
  //   .share-active {
  //     margin-bottom: 0;
  //   }
}
.v-enter,
.v-leave-to {
  transform: translateY(100%);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.3s ease;
}
</style>
