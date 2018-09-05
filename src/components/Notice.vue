<template>
    <div class="noticebg" v-if="messageCount>0">
        <div class="notice">
            <img class='messageicon' />
            <span class='message'>{{messageCount}}条新消息</span>
            <img class='arrow' src='../assets/ic_arrow.png' />
        </div>
        <div class="line"></div>
    </div>

</template>

<script>
export default {
  props: ["messageCount"]
};
</script>

<style lang="less" scoped>
.noticebg {
  width: 100%;
  margin-top: 40px;
  padding-top: 8px;
  box-sizing: border-box;
  .notice {
    width: 360px;
    height: 80px;
    background-color: rgb(56, 56, 56);
    border-radius: 4px;
    margin: auto;

    vertical-align: middle;
    .messageicon {
      display: inline-block;
      width: 64px;
      height: 64px;
      border-radius: 8px;
      background-color: rgb(253, 231, 231);
      margin-left: 8px;
      margin-right: 30px;
      margin-top: -4px;
    }
    .message {
      margin-top: 2px;
      display: inline-block;
      line-height: 80px;
      color: white;
      font-size: 28px;
      font-weight: bolder;
      text-align: center;
      width: 180px;
    }
    .arrow {
      width: 14px;
      height: 20px;
      margin-left: 30px;
      margin-bottom: 5px;
    }
  }
  .line {
    width: 694px;
    height: 2px;
    background-color: rgb(238, 238, 238);
    margin: 28px 28px 0px;
  }
}
</style>
