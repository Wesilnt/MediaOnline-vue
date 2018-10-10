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
</style>
