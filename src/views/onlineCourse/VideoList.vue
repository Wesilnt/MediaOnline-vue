<template>
    <div class="home-container">
        <div class="home-header"><img :src="columnHeaderImage" alt=""></div>
        <van-list
          class="home-video"
          v-model="refreshing"
          :finished="finished"
          :immediate-check="false"
          @load="scrollBottom"
          @offset="10">
            <videolistitem v-for="item of columns" :key="item.id" :iteminfo="item" @jumpEvent="jumpToVideoDetail(item.id)"/>
        </van-list>
        <!-- <div class="home-video">
            <videolistitem v-for="item of columns" :key="item.id" :iteminfo="item" @jumpEvent="jumpToVideoDetail(item.id)"/>
        </div> -->
        <div class="home-warnTip" v-show="finished">没有更多了,不要在拉了~</div>


    </div>
</template>
<script>
import videoListItem from './components/videoListItem.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('columnInfo')
export default {
  name: 'VideoList',
  data() {
    return {
      refreshing: false
    }
  },
  watch: {
    loading: function(loading) {
      this.refreshing = loading
    }
  },
  computed: {
    ...mapState([
      'columnHeaderImage',
      'columns',
      'columnOriginData',
      'finished',
      'loading'
    ])
  },
  components: {
    videolistitem: videoListItem
  },
  created() {
    this.getColumnList({ type: 1005, pageSize: 10, currentPage: 1 })
  },
  methods: {
    ...mapActions(['getColumnList']),
    //点击具体的一个视频专栏
    jumpToVideoDetail(courseId) {
      console.log('路由跳转 courseID = ' + courseId)
      let obj = { name: 'videoColumnDetail', params: { courseId } }
      this.$router.push(obj)
    },
    scrollBottom() {
      this.getColumnList({ type: 1005, pageSize: 10 })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-header {
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  background-color: red;

  img {
    width: 100%;
    height: 300px;
  }
}
.home-video {
  padding: 0 40px;
}
.home-warnTip {
  text-align: center;
  margin: 120px auto 180px;

  color: rgb(200, 200, 200);
}
</style>
