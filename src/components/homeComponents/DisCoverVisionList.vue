<template>
    <div class="list">
        <div v-for="(item, index) in visionList" :key="index" class="cell">
            <VisionCell :vision="item"/>
        </div>
    </div>
</template>

<script>
import VisionCell from './VisionCell.vue'
export default {
  components: {
    VisionCell
  },
  props: ['visionList']
}
</script>

<style lang="less" scoped>
.list {
  width: 100%;
}
.cell {
  height: 240px;
  margin-bottom: 36px;
}
</style>
