<template>
  <div class="video-comments-container">
       <!-- 全部留言 -->
      <comment-list :regionid="courseId" :regiontype="2201"></comment-list>
  </div>
</template>
<script>
import CommentList from '../../components/comment/CommentList.vue'
export default {
   data(){
     return{
       courseId:this.$route.params.courseId
     }
   },
    components: {'comment-list': CommentList},
}
</script>
<style lang="scss" scoped>
.video-comments-container{
  display: flex;
}
</style>
