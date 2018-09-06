<template>
  <div class="list">
    <div v-for="(book,index) in bookList" :key="index">
      <BookCell :book="book//////////////////////////////////////////////////////////////////////"/></div>
  </div>
</template>

<script>
import BookCell from '../components/homeComponents/BookCell.vue'
export default {
  components: {
    BookCell
  },
  props: ['bookList']
}
</script>

<style lang="less" scoped>
.list {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}
</style>
