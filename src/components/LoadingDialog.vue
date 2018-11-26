<template>
  <div class="loading-container">
       <van-loading color="white"></van-loading>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.loading-container {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
