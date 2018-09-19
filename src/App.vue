<template>
      <router-view/>
</template>
<script>
import { mapActions} from 'vuex'
import {getToken} from './utils/request.js'
export default {
  name: 'App',
  created(){
     this.getAccessToken()
     this.initAudio() 
  },
  methods: {...mapActions(["initAudio"]),
  getAccessToken(){
    getToken()
  }
  }
}
</script>
<style lang="scss">
@import 'publicUIConfig/common';
</style>
