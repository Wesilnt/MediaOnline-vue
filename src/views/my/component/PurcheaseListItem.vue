<template>
  <div class="item">
    <div class="item-header" @click="onItemClick" v-lazy:background-image="pic">
    </div>
    <div class="item-footer">
      <p class="van-ellipsis title">{{item.name}}</p>
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
    flex-direction: column;
    &-header {
      position: relative;
      width: 196px;
      height: 257px;
      border-radius: 12px;
      background: #fff center/100% no-repeat;
    }
    &-footer {
      margin-top: 14px;
      padding-left: 10px;
    }
    .title {
      max-width: 196px;
      color: rgb(51, 51, 51);
    }
  }
</style>
