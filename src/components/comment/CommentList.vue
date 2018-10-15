<template>
  <div class="comment-list-container">
      <div v-if="!refreshing && commentList.length<=0" class="nodata-container">
          还没有评论，快来评论吧!
      </div>
      <van-list
          class="comment-list"
          v-model="refreshing"
          :finished="finished"
          :immediate-check="false"
          @load="scrollBottom"
          @offset="10">
          <div>
           <van-cell :class="{'van-item': false}"  v-for="(item,index) of commentList" :key="item.id">
                  <comment-item :comment="item" :lastindex="(commentList.length-1)==index" :unindent="haspadding"/>
           </van-cell>
          </div>
      </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('commentData')
export default {
  data() {
    return {
      refreshing: false
    }
  },
  // regionid   专栏: courseId ,单集: lessonId
  // regiontype 2201:专栏,2202:单集
  props: ['regionid', 'regiontype','haspadding'],
  components: { 'comment-item': CommentItem },
  watch: {
    loading: function(loading) {
      this.refreshing = loading
    }
  },
  created() {
    let regionType = this.regiontype
    let regionId = this.regionid
    this.getCommentList({ regionId, regionType, isLoadMore: false })
  },
  computed: { ...mapState(['commentList', 'finished', 'loading']) },
  methods: {
    ...mapActions(['getCommentList']),
    //分页加载
    scrollBottom() {
      this.getCommentList({ regionId: this.regionid, isLoadMore: true })
    }
  }
}
</script>
<style lang="scss" scoped>
.comment-list-container{
  width: 100%;
}
.van-item{
  padding: 0px;
}
.comment-list {
  display: flex;
  flex-direction: column;
  // padding-bottom: 160px;
  padding-top: 10px;
  // width: 100vw;
}
.nodata-container {  
  text-align: center;
  line-height: 30vh;
  font-size: 20px;
}
</style>
