<template> 
      <div> 
        <keep-alive>
          <!-- 这里是会被缓存的视图组件，比如 AudioPlay！ -->
          <router-view  v-if="$route.meta.keepAlive" class="router-view"/>
        </keep-alive>
        <router-view  v-if="!$route.meta.keepAlive" class="router-view"/>
        <MediaIcon></MediaIcon>
      </div> 
</template>
<script>
import { mapActions } from 'vuex'
import MediaIcon from './components/audio/MediaIcon'
export default {
  name: 'App',
  components: { MediaIcon },
  methods: {
    ...mapActions(['registerWxConfig', 'setWxShareFriend', 'setWxShareZone']),
    handleWxShare: function(link) {
      const options = {
        title: '秦汉胡同在线',
        desc: '你一定会爱上的国学课',
        link,
        imgUrl: 'http://qiniu.shbaoyuantech.com/FsvTsNINf5rPwNOmQTfe-WSxTSF1?imageView2/1/w/100/h/100/format/jpg'
      }
      // console.log('App分享数据:', options)
      this.setWxShareFriend(options)
      this.setWxShareZone(options)
    }
  },
  watch: {
    $route({ fullPath }) {
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
  }
}
</script>
<style lang="scss">
@import 'publicUIConfig/common';
.router-view {
  font-size: 24px;
}
.video-popup {
  left: 0;
  top: 0;
  right: 0;
  transform: none;
}
.popup-modal-white {
  background-color: #fff;
    &:after{
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
