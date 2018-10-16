<template>
    <div class="home-container">
        <div class="lazy-img-larger home-header-img" v-lazy:background-image="`${columnHeaderImage}?imageView2/1/format/webp`"></div>
        <van-list
          class="home-video"
          v-model="refreshing"
          :finished="finished"
          :immediate-check="false"
          @load="scrollBottom"
          @offset="10">
            <VideoCell   v-for="item in columns" :key="item.id" :video="item"/>
        </van-list>
        <!-- <div class="home-video">
            <videolistitem v-for="item of columns" :key="item.id" :iteminfo="item" @jumpEvent="jumpToVideoDetail(item.id)"/>
        </div> -->
        <div class="home-warnTip" v-show="finished">没有更多了,不要在拉了~</div>
    </div>
</template>
<script>
import VideoCell from '../../components/homeComponents/VideoCell'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('columnInfoData')
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
    VideoCell
  },
  created() {
    this.getColumnList({ type: 1005, pageSize: 10, currentPage: 1 })
  },
  methods: {
    ...mapActions(['getColumnList']),
    scrollBottom() {
      this.getColumnList({ type: 1005, pageSize: 10 })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-header-img {
  height: 300px;
  margin-bottom: 20px;
  background: #f6f6f6 center/100% no-repeat;
  img {
    width: 100%;
    height: 300px;
  }
}
.home-video {
  padding: 0 28px;
}
.home-warnTip {
  text-align: center;
  margin: 120px auto 180px;

  color: rgb(200, 200, 200);
}
</style>
