<template>
    <div>
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
