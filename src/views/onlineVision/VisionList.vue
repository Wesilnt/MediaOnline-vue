<template>
  <!-- <div v-infinite-scroll="loadMore" class="myScroll" infinite-scroll-disabled="loading" infinite-scroll-distance="30"> -->
    <div>
    <img :src="bannerPic" class="head" alt="">
    <div class="middle" />
    <div v-for="(item, index) in visionList" :key="index" class="list">
      <VisionCell :vision="item" class="cell" />
      <div class="sep" />
    </div>
    <div class="bottomtip">没有更多了，不要再拉了</div>
  </div>
</template>

<script>
import VisionCell from '../../components/homeComponents/VisionCell.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('visionData')
export default {
  components: {
    VisionCell
  },
  computed: mapState(['bannerPic', 'visionList']),
  methods: {
    ...mapActions(['getVisionListData']),
    loadMore(){}
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
  display: block;
  width: 100%;
  height: 300px;
}
.middle {
  height: 10px;
  width: 100%;
}
.cell {
  margin-top: 20px;
  padding-bottom: 20px;
}
.sep {
  height: 1px;
  width: 100%;
  background-color: lightgray;
}
.bottomtip {
  text-align: center;
  height: 160px;
  color: lightgray;
  line-height: 160px;
  font-size: 28px;
}
</style>
