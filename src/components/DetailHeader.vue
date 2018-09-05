<template>
  <div class="header">
    <span class="title">{{title}}</span>
    <span @click="enterList" class="right">{{subtitle}} 
      <img class="arrow" src="../assets/vision_arrow.png" alt="">
    </span>
  </div>
</template>

<script>
export default {
  props: ["title", "link", "subtitle"],
  methods: {
    enterList() {
      this.$router.push({ path: this.link });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  padding: 40px 28px 20px;
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 32px;
  color: rgb(39, 51, 75);
  font-weight: bolder;
}
.right {
  margin-top: 6px;
  font-size: 24px;
  color: rgb(41, 53, 76);
}

.arrow {
  width: 15px;
  height: 28px;
  margin-left: 20px;
  vertical-align: top;
}
</style>