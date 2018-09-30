<template>
    <div class="lazy-img-larger cl-videolist-container"  v-lazy:background-image="iteminfo.coverPicH" @click="$emit('jumpEvent')">
        <p class="cl-videolist-item-title">{{iteminfo.name}}</p>
        <p>{{iteminfo.briefIntro}}</p>
        <p class="cl-videolist-item-teacher">
            {{iteminfo.authorName}}
        </p>
        <div>
            <span class="videolist-item-price">¥{{iteminfo.price}}</span>
            /
            <span>共{{iteminfo.lessonCount}}讲</span>
        </div>
        <i class="qhht-icon videolist-item-btn"></i>
    </div>
</template>

<script>
export default {
  name: 'videoListItem',
  props: ['iteminfo']
}
</script>

<style lang="less" scoped>
.cl-videolist-container {
  position: relative;
  padding-top: 32px;
  padding-left: 36px;
  border-radius: 12px;
  margin-bottom: 20px;
  background: #f6f6f6 center/cover no-repeat;
  height: 220px;
  color: #666;
}
.videolist-item-btn {
  position: absolute;
  width: 80px;
  height: 80px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url('../../../assets/images/onlinecourse-video-course-play.png');
}
.cl-videolist-item-title {
  font-size: 32px;
  color: #333;
  font-weight: 900;
}
.cl-videolist-item-teacher {
  margin-bottom: 24px;
}
.videolist-item-price {
  color: #ffa32f;
}
</style>
