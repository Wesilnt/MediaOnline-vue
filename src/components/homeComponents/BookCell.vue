<template>
  <div class="cell">
    <div class="cell-header" @click="onItemClick" v-lazy:background-image="`${book.coverPic}?imageView2/1/format/webp`">
      <span v-if="book.isNew" class="cell-isNew">上新</span>
      <i class="qhht-icon bookPlayTringle" @click.stop="onPlayClick" />
    </div>
    <div class="cell-footer">
      <p class="van-ellipsis title">{{book.name}}</p>
      <p class="price">¥{{book.price}}</p>
    </div>
  </div>

</template>
<script>
export default {
  props: ['book'],
  methods: {
    onItemClick() {
      this.$router.push({
        name: 'BookDetail',
        params: { courseId: this.book.id},
        query:{columnType:"Readings"}
      })
    },
    onPlayClick() { 
      if(this.book.freeLessonList&&this.book.freeLessonList.length>0){
        this.$router.push({
          name: 'AudioPlay',
          params: { id: this.book.freeLessonList[0].id },
          query:{columnType:"Readings",courseName:this.book.name}
        })
      }else{
        this.$toast('本书籍暂时不支持试听')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.cell {
  margin-bottom: 64px;
  .cell-isNew {
    position: absolute;
    left: 0;
    bottom: 0;
    border-radius: 0 20px 0 12px;
    padding: 0 10px;
    color: #fff;
    background: #e93323;
  }
  .cell-header {
    position: relative;
    width: 196px;
    height: 257px;
    border-radius: 12px;
    background: #fff center/100% no-repeat;
  }
  .bookPlayTringle {
    position: absolute;
    right: 16px;
    bottom: 16px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 0 8px 1px #e5dacf;
    background-color: #fff;
    background-image: url('../../assets/images/home_video_play.jpg');
    background-size: 18px;
  }
  .cell-footer {
    margin-top: 14px;
    padding-left: 10px;
  }
  .title {
    max-width: 196px;
    color: rgb(51, 51, 51);
  }
  .price {
    margin-top: 4px;
    color: rgb(255, 163, 47);
  }
}
</style>
