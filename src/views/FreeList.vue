<template>
  <div class="freelist">
    <div v-for="item in freelistList" :key="item.id" class="qhht-flex freelist-cell">
      <i class="qhht-icon freelist-play-button" ></i>
      <div  class="content">
        <span class="content-type">{{item.type}}</span>
        <span> {{item.title}}</span>
      </div>
    </div>
    <router-view name="FreeList" />
  </div>
</template>

<script>
export default {
  props: ['freelistList']
}
</script>

<style lang="less" scoped>
.freelist {
  background-color: rgba(245, 245, 245, 0.5);
  border-radius: 14px;
  margin-bottom: 28px;
  overflow: hidden;
}
.freelist-cell {
  position: relative;
  padding: 24px 20px;
  &:not(:last-child) {
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 654px;
      height: 2px;
      margin: 0 auto;
      background-color: #e7e7e7;
    }
  }
}
.freelist-play-button {
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 20px;
  background-color: #ffffff;
  background-image: url('../assets/home_video_play.jpg');
  background-size: 18px;
  box-shadow: 0 0 15px 2px #e5dacf;
}
.content {
  flex-grow: 1;
  font-size: 28px;
  color: #16233c;
}
.content-type {
  position: relative;
  padding-right: 20px;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -14px;
    height: 28px;
    width: 2px;
    margin-left: 10px;
    background-color: #16233c;
  }
}
</style>
