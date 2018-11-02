<template>
    <div class="home_visionlist_bottom">
        <VisionCell  v-for="(item, index) in data" :key="index" :vision="item"/>
    </div>
</template>

<script>
import VisionCell from './VisionCell.vue'
export default {
  name:'DisCoverVisionList',
  components: {
    VisionCell
  },
  props: ['data']
}
</script>

<style lang="less" scoped>
.home_visionlist_bottom{
   border-bottom: 2px solid #F1F1F1;
}
</style>

 
  