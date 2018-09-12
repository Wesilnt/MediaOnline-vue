<template>
      <router-view/>
</template>
<script>
import {mapMutations, mapActions} from 'vuex'
export default {
  name: 'App',
  data: function() {
    return {
      needBack: null
    }
  },
  created(){
     this.initAudio() 
  },
  methods: {...mapActions(["initAudio"])}
}
</script>
<style lang="scss">
@import 'publicUIConfig/common';
</style>
