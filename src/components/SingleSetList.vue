<template>
  <div class="singleset-list-conteiner">
    <div v-for="item of list" :key="item.id" class="singleset-list">
      <singleset :item="item" :playing="item.id==playId" :singletype='singletype' :coursename='coursename'/>
    </div>
  </div>

</template>

<script>
import SingleSet from './SingleSetItem.vue'
export default {
  components: { singleset: SingleSet },
  //list 单集列表数据
  props: ['list', 'playId','singletype','coursename'],
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
