<template>
    <section class="my-puzzle-container">
        <mt-navbar  fixed value="1">
            <mt-tab-item id="1">选项一</mt-tab-item>
            <mt-tab-item id="2">选项二</mt-tab-item>
            <mt-tab-item id="3">选项三</mt-tab-item>
        </mt-navbar>
        <mt-tab-container value="1" class="my-puzzle-content">
            <mt-tab-container-item id="1">
                <div v-for="n in 10" class="my-puzzle-content-cell">
                    <div></div>
                </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <div v-for="n in 4" >内容</div>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <div v-for="n in 6"  >内容</div>
            </mt-tab-container-item>
        </mt-tab-container>
    </section>
</template>

<script>
export default {
  name: "MyPuzzle"
};
</script>

<style scoped lang="less">
@navbarColor: #ffa32f;
.my-puzzle-container {
  min-height: 100vh;
  background-color: #fffcf7;
  .mint-tab-item {
    position: relative;
    color: @navbarColor;
    border: 0;
    padding: 28px 0;
    &.is-selected:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 120px;
      height: 4px;
      border-radius: 4px;
      background: @navbarColor;
    }
  }
}
.my-puzzle-content {
  margin-top: 80px;
  padding: 32px 40px;
}
.my-puzzle-content-cell {
  border-radius: 4px;
    padding: 32px;
    background-color: #fff;
    margin-bottom: 32px;
}
</style>
