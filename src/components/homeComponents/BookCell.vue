<template>
    <div class="cell">
        <img :src="book.url" class="cover" alt="">
        <img class="play-button" src="../../assets/home_video_play.png" alt="">
        <img v-if="book.isNew" src="" alt="">
        <p class="title">{{book.title}}</p>
        <p class="price">¥{{book.price}}</p>
    </div>
</template>
<script>
export default {
  props: ['book']
}
</script>
<style lang="less" scoped>
p {
  margin: 0;
  padding: 0;
}
.cell {
  position: relative;
  width: 196px;
  display: inline-block;
  margin-left: 40px;
  padding-bottom: 64px;

  .cover {
    display: block;
    width: 196px;
    height: 257px;
    border-radius: 12px;
  }
  .play-button {
    position: absolute;
    right: 0px;
    top: 197px;
    width: 60px;
    height: 60px;
  }
  .title {
    margin-top: 14px;
    margin-left: 10px;
    font-size: 24px;
    color: rgb(51, 51, 51);
  }
  .price {
    margin-top: 4px;
    font-size: 24px;
    margin-left: 10px;
    color: rgb(255, 163, 47);
  }
}
</style>
