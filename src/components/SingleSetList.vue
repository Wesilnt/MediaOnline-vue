<template>
  <div class="singleset-list-conteiner">
    <div class="singleset-list" v-for="item of list" :key="item.id">
      <singleset :item="item" :playing="item.id==playId"></singleset>
    </div>
  </div>

</template>

<script>
import SingleSet from "./SingleSetItem.vue";
export default {
  //list 单集列表数据
  props: ["list", "playId"],
  components: { singleset: SingleSet },
  data() {
    return { playingIndex: 0 };
  }
};
</script>

<style lang="scss" scoped>
.singleset-list-conteiner {
  .singleset-list {
    display: flex;
    flex-direction: column;
  }
}
</style>

