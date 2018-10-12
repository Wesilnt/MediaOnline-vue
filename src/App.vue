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
// import { mapActions } from 'vuex'
import MediaIcon from './components/audio/MediaIcon'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  'audiotaskData'
)
export default {
  name: 'App',
  components: { MediaIcon },
  created() {
    this.initAudio()
  },
  methods: {
    ...mapActions(['initAudio'])
  }
}
</script>
<style lang="scss">
@import 'publicUIConfig/common';
.router-view {
  font-size: 24px;
}
.IIV::-webkit-media-controls-play-button,
.IIV::-webkit-media-controls-start-playback-button {
  /*opacity: 0;*/
  /*pointer-events: none;*/
  /*width: 5px;*/
}
.video-popup {
  left: 0;
  top: 0;
  right: 0;
  transform: none;
  & ~ .van-modal {
    background-color: #fff;
  }
}
.videobox {
  /*width: 4.78rem;*/
  /*height: 7.8rem;*/
  /*position: absolute;*/
  /*top: 3.2rem;*/
  /*left: 1.2rem;*/
}
video {
  /*width: 4.2rem;*/
  /*height: 7.69rem;*/
  /*position: absolute;*/
  /*left: .22rem;*/
  /*top: .7rem;*/
  /*overflow: hidden;*/
}
</style>
