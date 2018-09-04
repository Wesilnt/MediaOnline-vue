<template>
  <div class="header">
    <div class="headerContent">
      <span class="title">{{title}}</span>
      <span @click="enterList" class="more">{{subtitle}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "link",'subtitle'],
  methods: {
    enterList() {
      this.$router.push({path:this.link})
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  padding: 40px 28px 20px;
  .headerContent {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: white url(../assets/pic_line.png) no-repeat left;
    background-size: 8px 33px;
    padding-left: 28px;
    box-sizing: border-box;
  }
}
.title {
  font-size: 36px;
  color: rgb(39, 51, 75);
  font-weight: bolder;
}
.more {
  margin-top: 14px;
  font-size: 24px;
  line-height: 24px;
  color: rgb(41, 53, 76);
  text-decoration: none;
}
</style>
