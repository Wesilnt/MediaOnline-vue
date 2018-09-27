<template>
      <router-view class="router-view"/>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
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
