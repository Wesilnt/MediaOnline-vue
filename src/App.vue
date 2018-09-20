<template>
      <router-view/>
</template>
<script>
import { mapActions} from 'vuex'
import {getToken} from './utils/request.js'
export default {
  name: 'App',
  beforeCreate(){ 
   getToken()
  },
  created(){
     this.initAudio() 
  },
  methods: {...mapActions(["initAudio"])
  }
}
</script>
<style lang="scss">
@import 'publicUIConfig/common';
</style>
