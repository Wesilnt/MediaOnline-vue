<template>
  <div class="cell" @click="onItemClick">
    <img :src="book.coverPic" class="cover" alt="">

    <div class="play-button">
      <img class="bookPlayTringle" src="../../assets/home_video_play.jpg" alt="">
    </div>
    <img v-if="book.isNew" :src='null' alt="">
    <p class="title">{{book.name}}</p>
    <p class="price">¥{{book.price}}</p>
  </div>
</template>
<script>
export default {
  props: ['book'],
  methods:{
    onItemClick(){
       this.$router.push({path:'/home/readings/book',query:{id:this.book.id}})
    }
  }
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bookPlayTringle {
    width: 16px;
    height: 18px;
    margin-left: 2px;
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
