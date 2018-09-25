<template>
    <div class="cl-videolist-container" :style="{ background : 'url('+iteminfo.coverPicH+')','background-size' : '100% 100%',backgroundRepeat : 'no-repeat' }" @click="$emit('jumpEvent')">
        <div class="cl-videolist-item-title">{{iteminfo.name}}</div>
        <div class="cl-videolist-item-info">{{iteminfo.briefIntro}}</div>
        <div class="cl-videolist-item-teacher">
            <div class="cl-videolist-item-name">{{iteminfo.commentator}}</div>
            <div class="cl-videolist-item-job">{{iteminfo.commentatorIntro}}</div>      
        </div>
        <div class="cl-videolist-item-bottom">
            <div class="cl-videolist-item-price">¥{{iteminfo.price}}</div>
            <div class="cl-videolist-item-sets">共{{iteminfo.lessonCount}}讲</div>
        </div>
        <img :src="require('../../../assets/images/onlinecourse-video-course-play.png')">
      
    </div>
</template>

<script>
export default {
  name: 'videoListItem',
  props: ['iteminfo']
}
</script>

<style lang="scss" scoped>
.cl-videolist-container {
  position: relative;
  width: 100%;
  background-color: rgb(253, 231, 231);
  padding: 32px 36px;
  box-sizing: border-box;
  text-align: left;
  border-radius: 16px;
  margin-bottom: 20px;

  img {
    position: absolute;
    width: 80px;
    height: 80px;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}
.cl-videolist-item-title {
  font-size: 32px;
  color: rgb(51, 51, 51);
  margin-bottom: 20px;
  font-weight: 900;
}
.cl-videolist-item-info {
  font-size: 24px;
  color: rgb(102, 102, 102);
  margin-bottom: 20px;
}
.cl-videolist-item-teacher {
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
}
.cl-videolist-item-name {
  font-size: 24px;
  color: rgb(102, 102, 102);
  &:after {
    content: '·';
    margin-left: 4px;
  }
}
.cl-videolist-item-job {
  font-size: 24px;
  color: rgb(102, 102, 102);
  margin-left: 4px;
}
.cl-videolist-item-bottom {
  display: flex;
  flex-direction: row;
}
.cl-videolist-item-price {
  font-size: 24px;
  color: rgb(255, 163, 47);
  &:after {
    content: '/';
    margin-left: 4px;
  }
}
.cl-videolist-item-sets {
  font-size: 24px;
  color: rgb(102, 102, 102);
}
</style>
