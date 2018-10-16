<template>
  <!-- <div v-infinite-scroll="loadMore" class="myScroll" infinite-scroll-disabled="loading" infinite-scroll-distance="30"> -->
  <div>
    <div class="lazy-img-larger head" v-lazy:background-image="`${bannerPic}?imageView2/1/format/webp`"></div>
    <van-list class="view-list" v-model="refreshing" :finished="finished" @load="loadMore" @offset="10">
      <div v-for="(item, index) in visionList" :key="index" class="view-list-cell">
        <VisionCell :vision="item"  />
      </div>
    </van-list>
    <div class="view-footer" v-if="finished">没有更多了，不要再拉了</div>
  </div>
</template>

<script>
import VisionCell from '../../components/homeComponents/VisionCell.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('visionData')
export default {
  data() {
    return {
      refreshing: false
    }
  },
  watch: {
    isLoading: function(isLoading) {
      this.refreshing = isLoading
    }
  },
  components: {
    VisionCell
  },
  computed: mapState(['bannerPic', 'visionList', 'finished', 'isLoading']),
  methods: {
    ...mapActions(['getVisionListData', 'getMoreData']),
    loadMore() {
      console.log('执行了loadmore')
      this.getMoreData()
      console.log(this.visionList)
    }
  },
  created() {
    this.getVisionListData()
  }
}
</script>
<style lang="less" scoped>
.myScroll {
  max-height: 1400px;
  overflow-y: auto;
}
.head {
  height: 300px;
  background: #f6f6f6 center/100% no-repeat;
}
.view-list {
  padding: 28px;
}
.view-list-cell {
  border-bottom: 2px solid #f1f1f1;
  margin-bottom: 20px;
  /deep/ .cell {
    margin-bottom: 20px;
  }
}
.view-footer {
  text-align: center;
  height: 160px;
  color: #c8c8c8;
  line-height: 160px;
}
</style>
