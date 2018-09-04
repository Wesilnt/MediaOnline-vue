<template>
    <div class="noticebg" v-if="messageCount>0">
        <div class="notice">
            <img class='icon' />
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
    width: 180px;
    height: 40px;
    background-color: rgb(56, 56, 56);
    border-radius: 4px;
    margin: auto;
    .icon {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      background-color: rgb(253, 231, 231);
      margin-left: 4px;
      margin-top: 4px;
    }
    .message {
      display: inline-block;
      width: 90px;
      position: absolute;
      color: white;
      font-size: 14px;
      font-weight: bolder;
      margin-left: 12px;
      line-height: 40px;
    }
    .arrow {
      width: 14px;
      height: 20px;
      margin-left: 100px;
      padding-bottom: 5px;
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
