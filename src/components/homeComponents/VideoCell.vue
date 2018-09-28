<template>
  <div v-lazy:background-image="video.coverPic" @click="onItemClick" class="qhht-flex cell">
    <i class="qhht-icon videoPlayTringle" />
    <p class="videoTitle">{{video.name}}</p>
    <p>{{video.briefIntro}}</p>
    <p>{{video.authorName}}</p>
    <p>
      <span class="price">¥{{video.price}}</span>/共{{video.lessonCount}}讲
    </p>
  </div>
</template>

<script>
export default {
  props: ['video'],
  methods: {
    onItemClick() {
      this.$router.push({
        name: 'videoColumnDetail',
        params: { courseId: this.video.id }
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
  background: #f6f6f6 center no-repeat;
  padding: 30px 36px;
  flex-wrap: wrap;
  margin-bottom: 20px;
  /deep/ p {
    width: 100%;
    flex-grow: 1;
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
  background-image: url('../../assets/home_video_play.jpg');
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
