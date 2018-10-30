<template>
  <!-- <div v-infinite-scroll="loadMore" class="myScroll" infinite-scroll-disabled="loading" infinite-scroll-distance="30"> -->
  <div>
    <div class="lazy-img-larger head" v-lazy:background-image="`${bannerPic}?imageView2/1/format/jpg`"></div>
    <van-list class="view-list" v-model="refreshing" :finished="columnFinished" :immediate-check="false" @load="loadMore" @offset="10">
      <div v-for="(item, index) in columnList" :key="index" class="view-list-cell">
        <VisionCell :data="item"  />
      </div>
    </van-list>
    <div class="view-footer" v-if="columnFinished">没有更多了，不要再拉了</div>
  </div>
</template>

<script>
import VisionCell from '../../components/homeComponents/VisionCell.vue'
import { createNamespacedHelpers } from 'vuex'
import {columnStatus} from '../../utils/config'
const { mapState,mapMutations, mapActions } = createNamespacedHelpers('columnData')
export default {
  data() {
    return {
      columnType:this.$route.params.columnType,
      refreshing: false
    }
  },
  watch: {
    columnLoading: function(isLoading) {
      this.refreshing = isLoading
    }
  },
  components: {
    VisionCell
  },
  computed: mapState(['bannerPic','columnList','columnFinished','columnLoading']),
  methods: {
    ...mapMutations(['resetState']),
    ...mapActions(['getColumnList']),
    loadMore() {
      console.log('执行了loadmore')
      this.getColumnList({ refresh: false, columnType: columnStatus[this.columnType] })
      // console.log(this.visionList)
    }
  },
  created() {
    console.log('============')
    this.getColumnList({ refresh: false, columnType:columnStatus[this.columnType] })
    // this.getVisionListData()
  },
  beforeDestroy() {
    this.resetState()
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
