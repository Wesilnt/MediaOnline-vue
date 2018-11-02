<template>
  <div class="singleset-list-conteiner">
    <div>
      <singleset 
        v-for="item of list" 
        class="singleset-list"
        :key="item.id" 
        :courseid="courseid"
        :item="item" 
        :playing="item.id==playId" 
        :activeID='playId'
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
  margin:0 36px -2px;
  .singleset-list {
    display: flex;
    flex-direction: column;
  }
}
</style>
