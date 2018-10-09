<template>
  <ul class="qhht-flex header">
    <li  class="qhht-icon headertitle-icon">
    </li>
    <li class="headertitle">
      {{title}}
    </li>
    <li @click="enterList">{{subtitle}}</li>
  </ul>
</template>

<script>
export default {
  props: ['title', 'link', 'subtitle'],
  methods: {
    enterList() {
      this.$router.push({ path: this.link })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  // border-top: 2px solid #F1F1F1;
  padding: 48px 0 30px;
}
.headertitle {
  font-size: 36px;
  color: rgb(39, 51, 75);
  font-weight: bolder;
  flex-grow: 1;
}
.headertitle-icon {
  width: 8px;
  height: 33px;
  background-image: url(../../assets/images/home_title_line.png);
  margin-right: 20px;
}
</style>
