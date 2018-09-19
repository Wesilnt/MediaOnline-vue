<template>
      <router-view/>
</template>
<script>
import { mapActions} from 'vuex'
import {getToken} from './utils/request.js'
export default {
  name: 'App',
  beforeCreate(){ console.log('程序加载前')
   getToken()
  },
  created(){
    console.log('程序加载')
    
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
