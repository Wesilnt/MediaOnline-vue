<template>
  <div class="singleset-list-conteiner">
    <div v-for="item of list" :key="item.id" class="singleset-list">
      <singleset 
      :courseid="courseid"
      :item="item" 
      :playing="item.id==playId" 
      :columnType='columnType' 
      :coursename='coursename' 
      :useraccessstatus = 'useraccessstatus' />
    </div>
  </div>

</template>

<script>
import SingleSet from './SingleSetItem.vue'
export default {
  components: { singleset: SingleSet },
  //list 单集列表数据
  props: ['list', 'playId','columnType','courseid','coursename','useraccessstatus'],
  data() {
    return { playingIndex: 0 }
  }
}
</script>

<style lang="scss" scoped>
.singleset-list-conteiner {
  .singleset-list {
    display: flex;
    flex-direction: column;
  }
}
</style>
