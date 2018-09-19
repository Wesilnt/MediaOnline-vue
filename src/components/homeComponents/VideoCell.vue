<template>
  <div :style="{backgroundImage: 'url(' + video.coverPic + ')' }" @click="onItemClick" class="cell">
    <div class="videoPlay">
      <img class="videoPlayTringle" src="../../assets/home_video_play.jpg" alt="">
    </div>
    <div class="text">
      <p class="videoTitle">{{video.name}}</p>
      <p class="videoDetail">{{video.briefIntro}}</p>
      <p class="videoDetail">{{video.authorName}}</p>
      <p class="videoDetail">
        <span class="price">¥{{video.price}}</span>/共{{video.lessonCount}}讲
      </p>
    </div>

  </div>
</template>

<script>
export default {
  props: ['video'],
  methods:{
    onItemClick(){ 
      console.log(this.video.id)
       this.$router.push({name:'videoColumnDetail',params:{courseId:this.video.id}})
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
  width: 694px;
  height: 220px;
  border-radius: 16px;
  margin-left: 28px;
  overflow: hidden;
}
.videoPlay {
  background-color: #ffffff;
  border-radius: 50%;
  position: absolute;
  width: 60px;
  height: 60px;
  top: 50%;
  left: 50%;
  margin-top: -30px; /* 高度的一半 */
  margin-left: -30px; /* 宽度的一半 */
  -webkit-box-shadow: 0 0 15px 2px #e5dacf;
  -moz-box-shadow: 0 0 15px 2px #e5dacf;
  box-shadow: 0 0 15px 2px #e5dacf;
  display: flex;
  justify-content: center;
  align-items: center;
}
.videoPlayTringle {
  width: 18px;
  height: 20px;
}
.text {
  margin-left: 36px;
  margin-top: 30px;
}
.videoTitle {
  font-size: 32px;
  color: rgb(51, 51, 51);
  font-weight: bolder;
}
.videoDetail {
  font-size: 24px;
  margin-top: 4px;
  color: rgb(102, 102, 102);
}
.price {
  color: rgb(255, 163, 47);
}
</style>
