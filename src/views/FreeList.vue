<template>
    <div class="free">
        <div class="freeCell" v-for="(item, index) in freeList" :key="index">
            <img class="free-icon" src="../assets/home_knowledge_play.png" alt="">
            <span class="content">{{item.type}}|{{item.title}}</span>
        </div>
          <div class="line"></div>
          <router-view name="FreeList"></router-view>
    </div>
</template>

<script>
export default {
  props: ["freeList"]
};
</script>

<style lang="less" scoped>

.free {
  margin-left: 28px;
  width: 694px;
  height: 200px;
  background-color: rgba(245, 245, 245, 0.5);
  border-radius: 14px;
}
.free-cell {
  height: 88px;
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
}
.free-icon {
  width: 68px;
  height: 68px;
  margin: 14px 16px 14px 20px;
  vertical-align: middle;
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
