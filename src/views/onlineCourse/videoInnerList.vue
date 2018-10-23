<template>
  <div>
    <playlist v-for="(item,index) of videoCourseList" :key="item.id" :iteminfo="item" :lastindex="index == (videoCourseList.length - 1)" @jumpEvent="gotoVideoCourseDetailPage(item)"/>

  </div>
</template>

<script>
import playlist from './components/playlist.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('videoColumnDetailData')

export default{
  data(){
    return{

    }
  },
   computed: { 
    ...mapState(['videoCourseList','courseName', 'userAccessStatus'])
  },
  components: {
    playlist
  },
  methods: {
    gotoVideoCourseDetailPage(item) {
      let unLock = false
      switch(this.useraccessstatus){
        case -3://拼团失败
        break
        case 0:
        break
        case 1001://单购成功
          unLock = true
        break
        case 1003://拼团成功
         unLock = true
        break
        case 1005://拼团中
        break
        case 1007://集赞成功未领取
        break
        case 1008://集赞成功已领取
         unLock = true
        break
        case 1009://集赞中
        break
      }
      if (item.isFree || unLock) {
         this.$router.push({ name: 'videoCourseDetail', params: { lessonId:item.id } })
      } else {
        this.$toast.fail('您还未购买该专栏')
      }
     
    },
  },
  mounted(){

  }
}
 

</script>
