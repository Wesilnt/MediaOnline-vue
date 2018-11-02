<template>
  <div>
    <van-list
      class="home-video"
      v-model="refreshing"
      :finished="lessonFinished"
      :immediate-check="false"
      @load="scrollBottom"
      @offset="10">
          <playlist v-for="(item,index) of lessonList" :key="item.id" :iteminfo="item" :lastindex="index == (lessonList.length - 1)" @jumpEvent="gotoVideoCourseDetailPage(item)"/>
    </van-list>
    <div class="home-warnTip" v-show="lessonFinished">没有更多了,不要在拉了~</div>
  </div>
</template>

<script>
import playlist from './components/playlist.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState,mapMutations, mapActions, mapGetters } = createNamespacedHelpers('columnData')

export default{
  data(){
    return{
      refreshing:false,
      courseId:this.$route.params.courseId
    }
  },
  created(){

  },
  watch: {
    lessonLoading: function(loading) {
      this.refreshing = loading
    }
  },
  computed: { 
    ...mapState(['lessonList','lessonLoading','lessonFinished', 'userAccessStatus'])
  },
  components: {
    playlist
  },
  methods: {
    ...mapMutations(['resetState']),
    ...mapActions(['getLessonList']),
    scrollBottom() {
      console.log('scrollBottom ==',this.courseId)
      this.getLessonList({ refresh: false, courseId: this.courseId })
    },
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
        //  this.$router.push({ name: 'videoCourseDetail', params: { lessonId:item.id } })
        this.$router.push({
          name: 'videoCourseDetail',
          params:{
            courseId : this.courseId,
            columnType:this.columnType,
            lessonId:item.id
          }
        }) 
      } else {
        this.$toast.fail('您还未购买该专栏')
      }
     
    },
  },
  mounted(){

  },
  beforeDestroy() {
    this.resetState()
  }
}

</script>

<style lang="scss" scoped>
.home-warnTip {
  text-align: center;
  margin: 120px auto 180px;

  color: rgb(200, 200, 200);
}
</style>

