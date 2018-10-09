<template>
    <div class="home_video_bottom">
        <VideoCell :video="item"  v-for="(item, index) in videoList" :key="index" />
    </div>
</template>

<script>
import VideoCell from './VideoCell.vue'

export default {
  components: {
    VideoCell
  },
  props: ['videoList']
}
</script>
<style lang="less" scoped>
.home_video_bottom{
  padding-bottom: 28px;
  border-bottom: 2px solid #F1F1F1;
}
</style>