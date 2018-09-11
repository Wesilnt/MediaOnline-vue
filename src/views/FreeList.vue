<template>
  <div class="free">
    <div v-for="(item, index) in freeList" :key="index" class="freeCell">
      <div class="freeCellContent">
        <div class="free-play-button">
          <div class="bookPlayTringle"></div>
        </div>
        <span class="content">{{item.type}}|{{item.title}}</span>
      </div>
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
  margin-left: 28px;
  width: 694px;
  background-color: rgba(245, 245, 245, 0.5);
  border-radius: 14px;
}
.free-cell {
  height: 88px;
  width: 100%;
  padding-left: 20px;
}
.free-play-button {
  margin-top: 20px;
  display: inline-block;
  width: 68px;
  height: 68px;
  background-color: red;
  border-radius: 50%;
}

.content {
  line-height: 88px;
  font-size: 28px;
  color: rgb(22, 35, 60);
}
.line {
  position: absolute;
  width: 654px;
  height: 2px;
  background-color: rgb(238, 238, 238);
  margin-top: -99px;
  margin-left: 28px;
}
</style>
