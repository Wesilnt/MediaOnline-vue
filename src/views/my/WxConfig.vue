<template>
    <div>
        <div class="lazy-img-most wxconfig-header" v-lazy:background-image="null"></div>
        <ScrollNavBar />
        <div class="wxconfig-title" id="title">
            <p>模拟标题</p>
        </div>
        <div  class="btn-wrapper">
            <van-button type="default" size="large" @click="handleRegisterWxConfig">注册微信</van-button>
            <van-button type="primary" size="large"  @click="handleWxShare">分享按钮</van-button>
            <van-button type="warning" size="large" @click="onOpenPupop">测试Picker</van-button>
            <van-button type="danger" size="large">待测试</van-button>
        </div>
        <div class="wxconfig-title" id="describe">
            <p>模拟详情</p>
        </div>
        <div class="wxconfig-title" id="comment">
            <p>模拟评论</p>
        </div>
        <div class="wxconfig-footer">
            模拟中间层
        </div>
        <div class="wxconfig-footer">
            模拟底部
        </div>
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
// 处理过的问题
// 微信config 重复注册，分享不成功(link必须与当前域名相同)等
// Vant picker组件
//tabBar头部黏贴 点击滚动到相应位置
import { mapActions } from 'vuex'
import ScrollNavBar from '../../components/ScrollNavBar'
export default {
  name: 'wxConfig',
  components: {
    ScrollNavBar
  },
  data() {
    return {
      show: false,
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      selectColumn: 0
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
        imgUrl: require('../../assets/images/poster_header_bg.jpg'),
        successCB: res => console.log(res),
        cancelCB: res => console.log(res)
      }
      this.setWxShareFriend(options)
      this.setWxShareZone(options)
    },
    onOpenPupop() {
      this.show = true
    },
    onChange(picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    onConfirm(value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`)
      this.show = false
    },
    onCancel() {
      this.$toast('取消')
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.wxconfig-header {
  height: 400px;
  background: #fff center no-repeat;
}
.wxconfig-title {
  height: 560px;
  margin: 20px;
  line-height: 560px;
  background: #fffad0;
  color: #6b6b6b;
  text-align: center;
}

.wxconfig-footer {
  margin: 20px;
  height: 400px;
  line-height: 400px;
  background: #fbfbfb;
  color: #9e9e9e;
  text-align: center;
}
.btn-wrapper {
  margin: 24px;
}
.van-button {
  margin-bottom: 12px;
}
</style>
