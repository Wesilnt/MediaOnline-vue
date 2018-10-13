<template>
  <div class="qhht-flex list">
      <BookCell :book="book" v-for="(book,index) in bookList" :key="index" :class="{emptyItem:!book.id}"/>
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
  flex-wrap: wrap;
  justify-content: space-between;
}
.emptyItem { 
  visibility: hidden;
 }
</style>
