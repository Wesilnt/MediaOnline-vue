<template>
    <div  class="router-view">
        <keep-alive>
            <!-- 这里是会被缓存的视图组件，比如 AudioPlay！ -->
            <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"/>
        <Navigation />
        <MediaIcon />
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import MediaIcon from './components/audio/MediaIcon'
import Navigation from './components/Navigation'

export default {
  name: 'App',
  components: { MediaIcon,Navigation },
  methods: {
    ...mapActions(['registerWxConfig', 'setWxShareFriend', 'setWxShareZone']),
    handleWxShare: function(link) {
      const options = {
        title: '秦汉胡同在线',
        desc: '你一定会爱上的国学课',
        link,
        imgUrl:
          'http://qiniu.shbaoyuantech.com/FsvTsNINf5rPwNOmQTfe-WSxTSF1?imageView2/1/w/100/h/100/format/jpg'
      }
      this.setWxShareFriend(options)
      this.setWxShareZone(options)
    }
  },
  watch: {
    $route: {
      handler({ fullPath }) {
        if (fullPath === '/') return
        // console.log(fullPath)
        if (fullPath.includes('/my')) {
          /*
                      * 隐藏我的相关页的分享及其他按钮
                      * */
          this.registerWxConfig({
            fullPath,
            jsApiList: ['hideAllNonBaseMenuItem']
          })
          wx.ready(function() {
            wx.hideAllNonBaseMenuItem()
          })
        } else {
          this.registerWxConfig({
            fullPath,
            jsApiList: [
              'onMenuShareAppMessage',
              'onMenuShareTimeline',
              'startRecord',
              'stopRecord',
              'onVoiceRecordEnd',
              'playVoice',
              'pauseVoice',
              'stopVoice',
              'onVoicePlayEnd',
              'translateVoice',
              'hideMenuItems'
            ]
          })
          this.handleWxShare(window.location.href)
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss">
@import 'publicUIConfig/common';

.router-view {
  min-height: 100vh;
  font-size: 24px;
  letter-spacing: 2px;
}

.video-popup {
  left: 0;
  top: 0;
  right: 0;
  transform: none;
}

.popup-modal-white {
  background-color: #fff;
  &:after {
    content: '点击此处返回';
    position: absolute;
    bottom: 72px;
    left: 0;
    right: 0;
    text-align: center;
    color: #9a9a9a;
  }
}
</style>
