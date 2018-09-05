<template>
  <div class="book-detail-container">
    <!-- 1. 头部 -->
    <div class="book-header-container">
      <div class="book-cover">
        <span>上新</span>
      </div>
    </div>
    <!-- 2. 书的相关人物信息 -->
    <div class="book-persons-container">
      <div class="person-item">
        <div class="person-label">
          <font>作</font>
          <font>者:</font>
        </div>
        <font>宅王鹏</font>
      </div>
      <hr>
      <div class="person-item">
        <div class="person-label">
          <font>演</font>
          <font>讲</font>
          <font>者:</font>
        </div>
        <font>宅王鹏</font>
      </div>
      <hr>
      <div class="person-item">
        <div class="person-label">
          <font>系</font>
          <font>列:</font>
        </div>
        <font>宅王鹏</font>
      </div>
      <hr>
    </div>
    <!-- 3. 作品属性 -->
    <div class="book-properties-container">
      <div class="property-item">
        <img src="../../assets/readings_detail_star.png">
        <p> 教育部新课必读书目 </p>
      </div>
      <div class="property-item">
        <img src="../../assets/readings_detail_star.png">
        <p> 民国四大才子宅王鹏代表作</p>
      </div>
      <div class="property-item">
        <img src="../../assets/readings_detail_star.png">
        <p>现代诗性小说大师之作</p>
      </div>
    </div>
    <hr>

    <!-- 4. 作品简介 -->
    <div class="book-introduce-container">
      <span>音频简介</span>
      <div class="introduce-content">
        <p>
          人类教育部新课必读书目，国民四大才子宅王鹏代表作，现代诗性小说大师之作。 人类教育部新课必读书目，国民四大才子宅王鹏代表作，现代诗性小说大师之作。 人类教育部新课必读书目，国民四大才子宅王鹏代表作，现代诗性小说大师之作。
        </p>
        <div class="intoduce-whole">
          <span @click="toLookWhole">查看全部</span>
        </div>
      </div>
    </div>
    <hr>
    <!-- 5. 作品单集/章集 播放列表 -->
    <div class="book-list-container">
      <router-link to="/audio/audioplay" v-for="item of bookList" :key="item.id" class="book-item" tag="div">
        <div class="item-content">
          <div class="item-icon" :class="{'icon-playing':item.isPlaying}">
            <img :src="item.isPlaying?require('../../assets/readings_detail_play.png'):require('../../assets/readings_detail_pause.png')">
          </div>
          <div class="item-describe">
            <h3 :class="{'item-playing':item.isPlaying}">
              发刊词：为什么抱元科技没有食堂？
            </h3>
            <h4>
              史上最会钓鱼的老头
            </h4>
            <div class="bottom-container">
              <span v-if="item.isAudition">试听</span>
              <p>00:06:22 | 已听1%</p>
            </div>
          </div>
        </div>
        <hr>
      </router-link>
    </div>
    <!-- 6. 分页布局 -->
    <div class="load-more-container">
      <span>没有更多了，不要再拉啦～</span>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      bookList: [
        { isAudition: true, isPlaying: true },
        { isAudition: true, isPlaying: false },
        { isAudition: false, isPlaying: false },
        { isAudition: false, isPlaying: false },
        { isAudition: false, isPlaying: false },
        { isAudition: false, isPlaying: false },
        { isAudition: false, isPlaying: false },
        { isAudition: false, isPlaying: false }
      ]
    };
  },
  methods: {
    toLookWhole() {
      this.$router.push({ path: "/home/readings/summary", query: {}, replace: true }); //query参数，replace 表示当前组件移除
    }
  }
};
</script>
<style lang="scss" scoped>
.book-detail-container {
  background-color: white;
  hr {
    height: 2px;
    border: none;
    margin: 0 20px;
    background-color: rgb(237, 237, 237);
  }
  //1. 作品封面介绍
  .book-header-container {
    height:440px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    background-color: #f6f5f6;
    padding-top: 36px;

    .book-cover {
      position: relative;
      height: 350px;
      width: 268px;
      background-color: #fde3e3;
      span {
        border-top-right-radius: 20px;
        background-color: red;
        font-weight: 500;
        padding: 10px 20px;
        position: absolute;
        bottom: 0;
        color: white;
        font-size: 36px;
        letter-spacing: 4px;
      }
    }
  }
  //2. 相关人物介绍
  .book-persons-container {
    display: flex;
    flex-direction: column;
    .person-item {
      padding: 48px 40px;
      background-color: white;
      display: flex;
      flex-direction: row;
    }
    .person-label {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 124px;
      margin-right: 20px;
    }
    .person-label > font {
      color: rgb(170, 175, 188);
      font-size: 28px;
    }
    .person-item font :nth-child(2) {
      color: rgb(22, 35, 60);
      font-size: 28px;
    }
  }
  //3. 相关属性/称号介绍
  .book-properties-container {
    padding: 40px 40px;
    display: flex;
    flex-direction: column;
    .property-item {
      display: flex;
      flex-direction: row;
      margin: 8px 0px;
      align-items: center;
    }
    .property-item img {
      width: 28px;
      height: 28px;
    }
    .property-item p {
      color: rgb(22, 35, 60);
      font-size: 28px;
      line-height: 28px;
      margin: 0;
    }
  }
  //4. 作品简介
  .book-introduce-container {
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    box-sizing: content-box;
    span {
      margin-top: 48px;
      font-size: 32px;
      line-height: 36px;
      font-weight: 800;
      color: rgb(62, 62, 83);
    }
    .introduce-content {
      margin-top: 40px;
      display: flex;
      flex-direction: column;
      p {
        margin: 0;
        font-size: 32px;
        color: rgb(22, 35, 60);
        line-height: 48px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
      }
      .intoduce-whole {
        text-align: center;
        margin: 48px 0;
      }
      .intoduce-whole span {
        font-size: 36px;
        color: rgb(255, 163, 47);
      }
    }
  }
  //5. 作品单集/章集列表
  .book-list-container {
    display: flex;
    flex-direction: column;
    .book-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      .item-icon {
        align-self: center;
        width: 96px;
        height: 96px;
        padding: 28px 31px 28px 35px;
        box-sizing: border-box;
        background-color: #fde3e3;
        border-radius: 96px;
      }
      .icon-playing {
        padding: 31px 28px 31px 29px;
      }
      .item-icon img {
        width: 28px;
        height: 40px;
        margin: auto 0;
      }
      .icon-playing img {
        width: 38px;
        height: 34px;
        margin: auto 0;
      }
    }
    .book-item .item-content {
      margin-left: 36px;
      display: flex;
      flex-direction: row;
    }
    .item-describe {
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      h3 {
        font-size: 28px;
        color: rgb(22, 35, 60);
        margin: 24px 0 0 0;
        line-height: 14px;
      }
      h4 {
        margin: 20px 0 0 0;
        font-size: 24px;
        line-height: 24px;
        color: rgb(102, 102, 102);
      }
      .item-playing {
        color: rgb(255, 163, 47);
      }
    }
    .bottom-container {
      display: flex;
      flex-direction: row;
      margin: 20px 0 24px 0;
      align-items: center;
    }
    .bottom-container span {
      background-color: #ea605c;
      color: white;
      padding: 2px 10px;
      border-radius: 10px;
      font-size: 26px;
      margin-right: 20px;
    }
    .bottom-container p {
      font-size: 24px;
      color: rgb(148, 154, 170);
      margin: 0;
    }
  }
  // 6. 分页布局
  .load-more-container {
    width: 100%;
    text-align: center;
    height: 64px;
    font-size: 24px;
    padding: 96px 0;
    color: rgb(200, 200, 200);
  }
}
</style>
