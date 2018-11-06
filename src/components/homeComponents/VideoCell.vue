<template>
  <div v-lazy:background-image="`${data.coverPicH}?imageView2/1/format/jpg`" @click="onItemClick" class="qhht-flex lazy-img-larger cell">
      <i class="qhht-icon videoPlayTringle" ></i>
    <p class="videoTitle">{{data.name}}</p>
    <p>{{data.briefIntro}}</p>
    <p>{{data.authorName}}</p>
    <p>
      <span class="price">¥{{data.price}}</span>/共{{data.lessonCount}}讲
    </p>
  </div>
</template>

<script>
export default {
  props: ['data', 'columnType'],
  methods: {
    onItemClick() {
      // const {columnType}=this.$route.params
      // this.$router.push({
      //   name: 'videoColumnDetail',
      //   params: { courseId: this.video.id }
      // })
      let columnType = this.columnType || this.$route.params.columnType
      this.$router.push({
        name: 'ColumnDetail',
        params: { columnType, courseId: this.data.id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.cell {
  position: relative;
  height: 220px;
  border-radius: 16px;
  overflow: hidden;
  background: #f6f6f6 center/cover no-repeat;
  padding: 30px 36px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  /deep/ p {
    width: 100%;
    flex-grow: 1;
    max-width: 620px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.videoPlayTringle {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -30px;
  margin-left: -30px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: #fff;
  background-image: url('../../assets/images/home_video_play.jpg');
  background-size: 20px;
  box-shadow: 0 0 15px 2px #e5dacf;
}

.videoTitle {
  font-size: 32px;
  color: #333333;
  font-weight: bolder;
}
.price {
  color: #ffa32f;
}
</style>
