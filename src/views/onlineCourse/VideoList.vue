<template>
    <div class="home-container">
        <div class="lazy-img-larger home-header-img" v-lazy:background-image="`${bannerPic}?imageView2/1/format/jpg`"></div>
        <van-list
          class="home-video"
          v-model="refreshing"
          :finished="columnFinished"
          :immediate-check="false"
          @load="scrollBottom"
          @offset="10">
            <VideoCell   v-for="item in columnList" :key="item.id" :data="item"/>
        </van-list>
        <div class="home-warnTip" v-show="columnFinished">没有更多了,不要在拉了~</div>
    </div>
</template>
<script>
import VideoCell from '../../components/homeComponents/VideoCell'
import { createNamespacedHelpers } from 'vuex'
import { columnType, columnStatus } from '../../utils/config'
const { mapState, mapActions } = createNamespacedHelpers('columnData')
export default {
  name: 'VideoList',
  data() {
    return {
      refreshing: false,
      columnType: this.$route.params.columnType
    }
  },
  watch: {
    columnLoading: function(loading) {
      this.refreshing = loading
    }
  },
  computed: {
    ...mapState([
      'bannerPic', //专栏列表头图
      'columnList', //专栏列表
      'columnFinished',
      'columnLoading'
    ])
  },
  components: {
    VideoCell
  },
  created() {
    this.getColumnList({ refresh: true, columnType: this.columnType })
  },
  methods: {
    ...mapActions(['getColumnList', 'resetState']),
    scrollBottom() {
      this.getColumnList({ refresh: false, columnType: this.columnType })
    }
  },
  beforeDestroy() {
    this.resetState()
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
