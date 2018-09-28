<template>
    <div class="btn-wrapper">
        <van-button type="default" size="large" @click="handleRegisterWxConfig">注册微信</van-button>
        <van-button type="primary" size="large"  @click="handleWxShare">分享按钮</van-button>
        <van-button type="warning" size="large" @click="onOpenPupop">测试Picker</van-button>
        <van-button type="danger" size="large">危险按钮</van-button>
        <van-popup v-model="show" position="bottom">
            <van-picker
                show-toolbar
                title="标题"
                :columns="columns"
                @cancel="onCancel"
                @confirm="onConfirm"
                ref="picker"
            />
        </van-popup>

    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'wxConfig',
  data() {
    return {
        show:false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        selectColumn:0
    }
  },
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
    },
      onOpenPupop(){
          this.show=true
      },
    onChange(picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onConfirm(value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
        console.log(this.$refs.picker);
        this.show=false
    },
    onCancel() {
      this.$toast('取消')
        this.show=false
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
