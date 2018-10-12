<template>
  <div v-show="show" class="share-container" @click.self="onCancel">
    <div v-show="showTip" class="share-tip">
    </div>
    <transition @after-leave="afterLeave">
      <div v-show="isOpen" class="share-content">
        <div class="share-src">
          此网页由www.shbaoyuantech.com提供
        </div>
        <div class="share-list">
          <div class="share-item" @click="toPoster">
            <div class="share-icon">
              <img src="../../assets/images/share_poster.png">
            </div>
            <span class="share-label">生成海报</span>
          </div>
          <div class="share-item" @click="onShareItem('friends')">
            <div class="share-icon">
              <img src="../../assets/images/share_friends.png">
            </div>
            <span class="share-label">发送给朋友</span>
          </div>
          <div class="share-item" @click="onShareItem('circle')">
            <div class="share-icon">
              <img src="../../assets/images/share_circle.png">
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
import { mapActions, mapState } from 'vuex'
export default {
  props: ['show', 'sharetype', 'shareid', 'shareInfo'],
  data() {
    return {
      isOpen: false,
      showTip:false
    }
  },
  watch: {
    show(value) {
      this.isOpen = value
      if (value) {
        const { fullPath } = this.$route
        this.registerWxConfig({
          fullPath,
          jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
        })
      }
    }
  },
  computed: {
    ...mapState(['url'])
  },
  methods: {
    ...mapActions(['registerWxConfig', 'setWxShareFriend', 'setWxShareZone']),
    onShareItem(shareScore) {
      // this.isOpen = false
      const nickname = 'nihao' 
      const shareOption = {
        link: this.url + this.shareInfo.link,
        title: this.shareInfo.title,
        desc: this.shareInfo.desc,
        imgUrl:  this.shareInfo.imgUrl,
        successCB: () => {
          this.$toast('分享回调成功')
        },
        cancelCB: () => {
          this.$toast('分享回调失败')
        }
      }
      console.log('当前分享option:')
      console.log(shareOption)
      if (shareScore === 'poster') {
        this.$toast('分享海报')
      }
      if (shareScore === 'friends') {
        // this.$toast('分享给朋友')
        this.showTip = true
        // this.setWxShareFriend(shareOption)
      }
      if (shareScore == 'circle') {
        this.showTip = true
        // this.$toast('分享到朋友圈')
        // this.setWxShareZone(shareOption)
      }
    },
    toPoster(){
     this.$router.push({path:'/share/poster',query:{shareUrl: this.url + this.shareInfo.link || '/#/home'}})
    },
    onCancel() {
      this.isOpen = false,
      this.showTip = false
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
  .share-tip{
    margin: 40px 30px 0px 400px;
    width: 320px;
    height: 164px;
    background-repeat: no-repeat;
    background-size: 320px 164px;
    background-image: url('../../assets/images/share_tip.jpg');
  }
  .share-content {
    position: fixed;
    background-color: #e1d9d5;
    width: 100%;
    bottom: 0;
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease;
    .share-src {

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
  transition: all 0.1s ease;
}
</style>
