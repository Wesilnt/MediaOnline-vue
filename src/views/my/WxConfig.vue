<template>
    <div class="btn-wrapper">
        <van-button type="default" size="large" @click="handleRegisterWxConfig">config</van-button>
        <van-button type="primary" size="large"  @click="handleWxShare">分享按钮</van-button>
        <van-button type="warning" size="large">警告按钮</van-button>
        <van-button type="danger" size="large">危险按钮</van-button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'wxConfig',

  methods: {
    ...mapActions(['registerWxConfig', 'setWxShareFriend', 'setWxShareZone']),
    handleRegisterWxConfig: function() {
      const { fullPath } = this.$route
      this.registerWxConfig({
        fullPath,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
      })
    },
    handleWxShare: function() {
      const options = {
        title: '分享',
        desc: '测试分享',
        link: window.location.href,
        imgUrl: require('../../assets/poster_header_bg.jpg'),
        successCB: res => console.log(res),
        cancelCB: res => console.log(res)
      }
      this.setWxShareFriend(options)
      this.setWxShareZone(options)
    }
  }
}
</script>

<style scoped>
.btn-wrapper {
  margin: 24px;
}
.van-button {
  margin-bottom: 12px;
}
</style>
