<template>
  <div class="header">
    <span class="title">{{title}}</span>
    <span class="right" @click="enterList">{{subtitle}} 
      <img class="arrow" src="../../assets/images/arrow_right.png" alt="">
    </span>
  </div>
</template>

<script>
export default {
  props: ['title', 'link', 'subtitle', 'courseId'],
  methods: {
    enterList() {
      this.$router.push({path:`${this.link}/${this.courseId}`})
    }
  }
}
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
  margin-top: 4px;
  color: rgb(41, 53, 76);
  display: flex;
  vertical-align: middle;
}

.arrow {
  width: 15px;
  height: 26px;
  margin-left: 20px;
  margin-top: 4px;
}
</style>
