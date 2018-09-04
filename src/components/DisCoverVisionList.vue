<template>
    <div class="list">
        <div class="cell" v-for="(item, index) in visionList" :key="index">
            <VisionCell :vision='item'></VisionCell>
        </div>
    </div>
</template>

<script>

import VisionCell from './VisionCell.vue'
export default {
 props:['visionList'],
  components:{
      VisionCell
  }
};
</script>

<style lang="less" scoped>
.list{
    width: 100%;
}
.cell{
    width: 100%;
    height: 240px;
    padding-bottom: 36px;
}
</style>
