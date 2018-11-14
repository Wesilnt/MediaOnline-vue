<template>
  <div>
    <van-list
      class="home-video"
      v-model="refreshing"
      :finished="lessonFinished"
      :immediate-check="true"
      @load="scrollBottom"
      @offset="10">
          <SingleSetItem v-for="item of lessonList" 
            :key="item.id" 
            :item="item"  
            :courseid="courseId"
            :columnType="columnType"
            :useraccessstatus="userAccessStatus"/>
    </van-list>
    <div class="home-warnTip" v-show="lessonFinished">没有更多了,不要在拉了~</div>
  </div>
</template>

<script>
import SingleSetItem from '../../components/SingleSetItem.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('columnData')

export default {
  data() {
    return {
      refreshing: false,
      userAccessStatus:0,
      courseId: this.$route.params.courseId,
      columnType: this.$route.params.columnType
    }
  },
  created() {
      this.getUserAccessStatus({courseId:this.courseId}).then(res=>this.userAccessStatus = res)},
  watch: {
    lessonLoading: function(loading) {
      this.refreshing = loading
    }
  },
  computed: {
    ...mapState([
      'lessonList',
      'lessonLoading',
      'lessonFinished',
    ])
  },
  components: {
    SingleSetItem
  },
  methods: {
    ...mapActions(['resetState','getLessonList','getUserAccessStatus']),
    scrollBottom() {
      console.log('scrollBottom ==', this.courseId)
      this.getLessonList({ refresh: false, courseId: this.courseId })
    }
  },
  mounted() {},
  beforeDestroy() {
    this.resetState()
  }
}
</script>

<style lang="scss" scoped>
.home-video {
  margin: 0 36px 0;
}
.home-warnTip {
  text-align: center;
  margin: 120px auto 180px;

  color: rgb(200, 200, 200);
}
</style>
