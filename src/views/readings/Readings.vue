<template>
    <div class="read-container">
        <!-- 1. 头部信息 -->
        <div class="header-container">
            <h5 class="title">
                有声书
            </h5>
            <hr>
            <p class="desc">
                联合各领域名师大家精心打造课程专栏，提升中国少年的综合素养，建立光靠做题无法培养的竞争力。
            </p>
        </div>
        <!-- 2. 全部书籍按钮 -->
        <div class="read-btn">
            <p>
                全部书籍
            </p>
        </div>
        <!-- 3. 读书会列表 -->
        <div class="read-list-container">
            <router-link to="/home/readings/book" class="list-item" v-for="(item,i) of readList" :key="i" tag="div">
                <div class="top-container">
                    <span>上新</span>
                    <img src="../../assets/readings_item_play.png">
                </div>
                <div class="bottom-container">
                    <p>小鸡喔喔叫</p>
                    <span>¥ 4.99</span>
                </div>
            </router-link>
        </div>
        <!-- 分页加载 -->
        <div class="load-more-container">
            <span>没有更多了，不要再拉啦～</span>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      readList: [{}, {}, {}, {}, {}, {}, {}, {}, {}]
    }
  }
}
</script>
<style lang="scss" scoped>
.read-container {
  display: flex;
  flex-direction: column;
  background-color: white;
  //头部样式
  .header-container {
    display: flex;
    flex-direction: column;
    background-color: #f6c26b;
    color: white;
    padding: 40px;
    h5 {
      font-size: 48px;
      line-height: 56px;
      padding-top: 56px;
      margin: 0;
      font-weight: 300;
    }
    hr {
      margin: 0;
      margin-top: 40px;
      border: none;
      height: 4px;
      background-color: white;
      width: 128px;
    }
    p {
      margin: 40px 0 0 0;
      font-size: 24px;
    }
  }
  //中间按钮样式
  .read-btn {
    position: sticky;
    top: 0px;
    z-index: 2004;
    width: 100%;
    background-color: white;
    p {
      margin: 40px 0 0 40px;
      color: white;
      text-align: center;
      line-height: 64px;
      font-size: 24px;
      width: 208px;
      border-radius: 20px;
      height: 64px;
      background-color: rgb(255, 163, 47);
    }
  }
  //列表样式
  .read-list-container {
    padding: 0 2.66666667% 0 2.53333333%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 40px;
    box-sizing: border-box;
    .list-item {
      display: flex;
      flex-direction: column;
      width: 33.33333333%;
      padding: 0 2.81293952% 64px 2.9535865%;
      box-sizing: border-box;
    }
    .top-container {
      position: relative;
      background-color: #fde3e3;
      border-radius: 20px;
      width: 100%;
      height: 0;
      padding-bottom: 130.6122449%;
      span {
        position: absolute;
        bottom: 0;
        left: 0;
        border-bottom-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: red;
        padding: 6px 24px;
        font-size: 24px;
        color: white;
      }
      img {
        position: absolute;
        bottom: 10px;
        right: 10px;
        width: 56px;
        height: 56px;
      }
    }
    .bottom-container {
      display: flex;
      flex-direction: column;
      p {
        font-size: 24px;
        color: rgb(22, 35, 60);
        margin: 20px 0 0 0;
      }
      span {
        font-size: 24px;
        color: rgb(255, 163, 47);
        margin-top: 16px;
      }
    }
  }
  .load-more-container {
    width: 100%;
    text-align: center;
    height: 64px;
    font-size: 24px;
    margin-bottom: 64px;
    color: rgb(200, 200, 200);
  }
}
</style>
