<template>
  <div class="cell">
    <img :src="book.coverPic" class="cover" alt="">
    <!-- <img class="play-button" src="../../assets/home_video_play.png" alt=""> -->
    <div class="play-button">
      <div class="bookPlayTringle"></div>
    </div>
    <img v-if="book.isNew" src="" alt="">
    <p class="title">{{book.name}}</p>
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
    right: 10px;
    top: 197px;
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 50%;
      -webkit-box-shadow: 0 0 8px 1px #e5dacf;
  -moz-box-shadow: 0 0 8px 1px #e5dacf;
  box-shadow: 0 0 8px 1px #e5dacf;
  }
  .bookPlayTringle {
  display: inline-block;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 10px 18px;
  border-color: transparent;
  border-left-color: #ffa32f;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -10px;
  margin-left: -6px;
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
