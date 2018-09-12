<template>
  <div class="free">
    <div v-for="(item, index) in freeList" :key="index" class="freeCell">
      <div class="free-play-button-container">
        <div class="free-play-button">
          <img class="freePlayIcon" src="../assets/home_video_play.jpg" alt="">
        </div>
      </div>
      <span class="content">{{item.type}}|{{item.title}}</span>
    </div>
    <div class="line" />
    <router-view name="FreeList" />
  </div>
</template>

<script>
export default {
  props: ['freeList']
}
</script>

<style lang="less" scoped>
.free {
  width: 694px;
  background-color: rgba(245, 245, 245, 0.5);
  border-radius: 14px;
  height: 177px;
}
.free-cell {
  height: 88px;
  width: 100%;
}
.free-play-button-container {
  display: inline-block;
  width: 88px;
  height: 88px;
  vertical-align: middle;
  margin-left: 28px;
}
.free-play-button {
  margin-top: 20px;
  width: 48px;
  height: 48px;
  background-color: #ffffff;
  border-radius: 50%;
  -webkit-box-shadow: 0 0 15px 2px #e5dacf;
  -moz-box-shadow: 0 0 15px 2px #e5dacf;
  box-shadow: 0 0 15px 2px #e5dacf;
  display: flex;
  justify-content: center;
  align-items: center;
}
.freePlayIcon {
  width: 16px;
  height: 18px;
}
.content {
  font-size: 28px;
  color: rgb(22, 35, 60);
}
.line {
  position: absolute;
  width: 654px;
  height: 2px;
  background-color: rgb(238, 238, 238);
  margin-top: -88px;
  margin-left: 28px;
}
</style>
