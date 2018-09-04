<template>
  <div class="list">
    <div v-for="(book,index) in bookList" :key="index">
      <BookCell :book=book> </BookCell>
    </div>
  </div>
</template>

<script>
import BookCell from "../components/BookCell.vue";
export default {
  props: ["bookList"],
  components: {
    BookCell
  }
};
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
</style>
