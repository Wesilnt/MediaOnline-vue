<template>
    <div>
        <VisionCell  v-for="(item, index) in visionList" :key="index" :vision="item"/>
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
