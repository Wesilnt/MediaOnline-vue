<template>
  <div class="item">
    <div class="item-avatar " v-lazy:background-image="pic"></div>
    <div class="item-content">
      <div class="item-content-name">{{item.name}}</div>
      <div class="item-content-playto">播放至：{{item.readto}}</div>
      <div class="item-content-updateto">更新至：{{item.lessonCount }}</div>
    </div>
  </div>

</template>
<script>
  export default {
    props: ['item','type'],
    data() {
      return {
      pic:''
      }
    },
    methods: {
      onItemClick() {
        if (this.type === '1003' || this.type === '1007') {
          this.$router.push({path: '/home/visionDetail/' + this.item.id})
        } else {
          this.$router.push({name: 'videoCourseDetail', params: {lessonId: this.item.id}})
        }
      },
    },
    created(){
      //设置头图
      //少年视野、读书会的头图为 coverPic 视频课程的头图为 coverPicH
      this.pic = this.item.coverPic ===''? this.item.coverPicV : this.item.coverPic
    }
  }
</script>
<style lang="less" scoped>
  .item {
    width: 100%;
    height: 280px;
    padding: 0px 20px 0px 30px;
    display: flex;
    flex-direction: row;
    &-avatar {
      width: 150px;
      height: 200px;
      background-color: #fde7e7;
      border-radius: 12px;
      margin: 30px 0px 0px 0px;
    }
    &-content {
      padding-left: 30px;
      &-name {
        padding-top: 40px;
        color: #333333;
        font-size: 30px;
        font-weight: bold;
      }
      &-playto {
        font-size: 26px;
        color: #999999;
        padding: 32px 30px 0px 0px;
      }
      &-updateto {
        font-size: 26px;
        color: #999999;
        padding: 38px 30px 0px 0px;
      }
    }
  }
</style>
