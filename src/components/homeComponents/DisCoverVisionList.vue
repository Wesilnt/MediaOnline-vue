<template>
    <div class="list">
        <div class="cell" v-for="(item, index) in visionList" :key="index">
            <VisionCell :vision='item'/>
        </div>
    </div>
</template>

<script>
import VisionCell from './VisionCell.vue'
export default {
  props: ['visionList'],
  components: {
    VisionCell
  }
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
