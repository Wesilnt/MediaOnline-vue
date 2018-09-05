<template>
  <div>
    <img class="head" ref="header" :src="banner" alt="">

    <div class="navbar">
      <span v-for="(nav,index) in navBars" :key="index" :class="currentNav==index?'item active':'item'" @click='navbarTap(index)'>{{nav}}</span>
    </div>
    <!-- introduce -->
    <div class="intro">
      <div class="info bottomline">
        <p class='infoText'>【本课程建议9岁以上孩子学习】</p>
        <div :class=" showall?'textFold infoText fulltext':'textFold infoText detault'">position: sticky; 基于用户的滚动位置来定位。 粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。 在目标区域以内，它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。 元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。 这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。 举例： div.sticky { position: -webkit-sticky; position: sticky; top: 0;/*阈值*/ padding: 5px; background-color: #cae8ca; border: 2px solid #4CAF50; } 缺陷：IE低版本不支持sticky的使用
        </div>
        <div :class="showall?'show hide':'show'">
          <img class="arrow" @click="ellipsis" :src="showall?require('../../assets/vison_arrow_up.png'):require('../../assets/vision_arrow_down.png')" alt="">
        </div>
      </div>
      <!-- outline -->
      <div class="outline bottomline">
        <div class='title'>课程列表
          <span class='count'>(共30讲)</span>
        </div>
        <img class='outlineImage' src=''>
        <img class="zoom" src="../../assets/vision_zoom.png" alt="">
      </div>

      <!-- try -->
      <div class="try bottomline">
        <DetailHeader title="试看课程" subtitle='全部'> </DetailHeader>
      </div>

    </div>
  </div>

</template>

<script>
import DetailHeader from '../../components/visionComponents/DetailHeader.vue'

export default {
  data() {
    return {
      banner: "",
      selected: "1",
      navBars: ["介绍", "试听", "留言"],
      currentNav: 0,
      showall: false
    };
  },
  props: ["id"],
  methods: {
    navbarTap(index) {
      this.currentNav = index;
    },
    ellipsis() {
      this.showall = !this.showall;
    }
  },components:{
    DetailHeader
  }
};
</script>

<style lang="less" scoped>
.head {
  display: block;
  width: 100%;
  height: 300px;
  background-color: red;
}

.navbar {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  background-color: white;
  border-bottom: 2px solid rgb(238, 238, 238);
}
.item {
  line-height: 80px;
  font-size: 28px;
  color: rgb(55, 67, 88);
  width: 120px;
  text-align: center;
}

.active {
  color: rgb(255, 163, 47);
  border-bottom: 4px solid rgb(255, 163, 47);
}

.infoText {
  margin: 40px;
  font-size: 30px;
  color: rgb(112, 127, 155);
}

.textFold {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.detault {
  -webkit-line-clamp: 6;
}
.fulltext {
  -webkit-line-clamp: 0;
}
.show {
  margin-top: -80px;
  height: 100px;
  position: relative;
  background: linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1));
}
.hide {
  margin-top: -40px;
  background: white;
}
.arrow {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -24px;
  margin-left: -24px;
}

.bottomline {
  border-bottom: 8px solid rgb(238, 238, 238);
}

.title {
  font-size: 32px;
  font-weight: bolder;
  color: rgb(39, 51, 75);
  margin: 40px;
}
.outline {
  position: relative;
}
.outlineImage {
  width: 670px;
  height: 800px;
  margin: 0px 40px 40px;
  background-color: pink;
}
.count {
  font-size: 28px;
  color: rgb(155, 161, 176);
}
.zoom {
  width: 72px;
  height: 72px;
  position: absolute;
  right: 56px;
  bottom: 60px;
}

</style>
