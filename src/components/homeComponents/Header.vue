<template>
  <ul class="qhht-flex header">
    <li class="header-title">
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
  margin: 48px 0 30px;
}
.header-title {
  position: relative;
  font-size: 36px;
  font-weight: bolder;
  flex-grow: 1;
  padding-left: 20px;
  color: #27334b;
  &:before {
    content: '';
    position: absolute;
    top:50%;
    bottom: 0;
    left: 0;
    width: 8px;
    height: 32px;
    border-radius: 32px;
    background-color: #ffa32f;
    transform: translate(0,-50%);
  }
}
</style>
