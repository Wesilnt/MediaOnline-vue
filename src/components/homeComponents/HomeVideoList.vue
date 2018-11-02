<template>
    <div class="home_video_bottom">
        <VideoCell v-for="item in data" :key="item.id" :video="item"/>
    </div>
</template>

<script>
import VideoCell from './VideoCell.vue'

export default {
  components: {
    VideoCell
  },
  props: ['data']
}
</script>
<style lang="less" scoped>
.home_video_bottom{
  padding-bottom: 28px;
  border-bottom: 2px solid #F1F1F1;
}
</style>