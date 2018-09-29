<template> 
      <div>
        <router-view class="router-view"/>  
        <MediaIcon></MediaIcon>
      </div> 
</template>
<script>
// import { mapActions } from 'vuex'
import MediaIcon from './components/audio/MediaIcon'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers( 'audiotask')
export default {
  name: 'App',
  components:{MediaIcon},
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
