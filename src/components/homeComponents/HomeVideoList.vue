<template>
    <div>
        <div v-for="(item, index) in videoList" :key="index" class="list">
            <VideoCell :video="item"/>
        </div>
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
.list {
  padding-bottom: 20px;
}
</style>
