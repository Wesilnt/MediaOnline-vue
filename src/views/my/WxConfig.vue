<template>
    <div class="btn-wrapper">
        <van-button type="default" size="large" @click="wxConfig">config</van-button>
        <van-button type="primary" size="large"  @click="wxShare">分享按钮</van-button>
        <van-button type="warning" size="large">警告按钮</van-button>
        <van-button type="danger" size="large">危险按钮</van-button>
    </div>
</template>

<script>
import { wxConfig, wxShare } from '../../utils/wxConfig'
export default {
  name: 'wxConfig',
  methods: {
    wxConfig: () => {
      wxConfig()
    },
    wxShare: function() {
      console.log(this.$router)
      wx.updateAppMessageShareData(
        {
          title: '这是配置页的分享',
          desc: 'Vue 我又更新npm了',
          link: window.href,
          imgUrl: require('../../assets/share_poster.png')
        },
        function(res) {
          // 用户确认分享后执行的回调函数
          console.log(res)
        }
      )
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
