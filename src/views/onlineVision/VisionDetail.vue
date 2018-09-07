<template>
  <div id="detailmain" ref="detailmain">
    <img :src="banner" class="head" alt="">

    <div class="navbar">
      <span v-for="(nav,index) in navBars" :key="index" :class="currentNav==index?'item active':'item'" @click="navbarTap(index)">{{nav}}</span>
    </div>
    <!-- introduce -->
    <div id="intro" ref="intro" class="intro">
      <div class="info bottomline">
        <p class="infoText">【本课程建议9岁以上孩子学习】</p>
        <div :class=" showall?'textFold infoText fulltext':'textFold infoText detault'">position: sticky; 基于用户的滚动位置来定位。 粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。 在目标区域以内，它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。 元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。 这个特定阈值指的是 top, right, bottom 或 left 之一，换言之，指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。 举例： div.sticky { position: -webkit-sticky; position: sticky; top: 0;/*阈值*/ padding: 5px; background-color: #cae8ca; border: 2px solid #4CAF50; } 缺陷：IE低版本不支持sticky的使用
        </div>
        <div :class="showall?'show hide':'show'">
          <img :src="showall?arrowUp:arrowDown" class="visionarrow" alt="" @click="ellipsis">
        </div>
      </div>
      <!-- outline -->
      <div class="outline bottomline">
        <div class="noticeBuyText">课程列表
          <span class="count">(共30讲)</span>
        </div>
        <img class="outlineImage" src="">
        <img class="zoom" src="../../assets/vision_zoom.png" alt="">
      </div>
    </div>
    <!-- try -->
    <div id="try" ref="try" class="try bottomline">
      <DetailHeader title="试看课程" subtitle="全部" />
      <SingleSetList :list='courseList'></SingleSetList>
    </div>
    <!-- message -->
    <div id="message" ref="message" class="message bottomline">
      <DetailHeader title="精选留言" subtitle="全部" />
      <div v-for="item of comments" :key="item.id" class="comment-item">
        <comment-item :comment="item" />
      </div>
    </div>

    <div class="noticeBuyArea">
      <div class="noticeBuyText">
        购买须知
        <p class="noticeBuyTextDetail">
基于用户的滚动位置来定位。 粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。 基于用户的滚动位置来定位。 粘性定位的元素是依赖于用户的滚动，在 position:relative 与 position:fixed 定位之间切换。 
        </p>
      </div>
    </div>
    <tools-navbar :btnstate="0"/>
  </div>

</template>

<script>
import DetailHeader from '../../components/visionComponents/DetailHeader.vue'
import arrowUp from '../../assets/vison_arrow_up.png'
import arrowDown from '../../assets/vision_arrow_down.png'
import SingleSetList from '../../components/SingleSetList.vue'
import CommentItem from '../../components/CommentItem.vue'
import toolsNavbar from '../../components/toolsNavbar.vue'
export default {
  components: {
    DetailHeader,
    SingleSetList,
    CommentItem,
    toolsNavbar
  },
  props: ['id'],
  data() {
    return {
      arrowUp,
      arrowDown,
      banner: '',
      selected: '1',
      navBars: ['介绍', '试听', '留言'],
      currentNav: 0,
      showall: false,
      courseList: [
        {
          id: 0,
          title: '发刊词：为什么抱元科技没有食堂？',
          subtitle: '史上最会钓鱼的老头',
          totaltime: 140,
          learntime: 40,
          isAudition: true,
          isPlaying: true
        },
        {
          id: 1,
          title: '发刊词：为什么抱元科技没有食堂？',
          subtitle: '史上最会钓鱼的老头',
          totaltime: 140,
          learntime: 40,
          isAudition: true,
          isPlaying: false
        },
        {
          id: 2,
          title: '发刊词：为什么抱元科技没有食堂？',
          subtitle: '史上最会钓鱼的老头',
          totaltime: 140,
          learntime: 40,
          isAudition: false,
          isPlaying: false
        }
      ],
      comments: [
        {
          id: Date.now() + 1, //评论ID
          isPraised: true, //当前用户是否对评论点赞
          type: 0, //评论类型 0 文字  1 语音
          isExpand: false, //默认是否展开
          content:
            '此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论',
          review:
            '此处为老师回复内容此处为老师回复内容此处为老师回复内容此处为老师回复内容此处为老师回复内容此处为老师回复内容', //回复内容
          reviewer: '伍智老师：', //回复老师姓名
          praiseNum: 1314, //点赞人数
          audioUrl: '', //语音地址
          audioTime: 0, //语音时长
          commentHead: '', //评论人头像地址
          commentName: '古风流', //评论人名称
          commentTime: Date.now() //评论时间
        },
        {
          id: Date.now() + 2, //评论ID
          isPraised: true, //当前用户是否对评论点赞
          type: 1, //评论类型 0 文字  1 语音
          isExpand: false, //默认是否展开
          content:
            '此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论',
          review: '此处为老师回复内容此处为老师回复内容此处为老师回复内', //回复内容
          reviewer: '伍智老师：', //回复老师姓名
          praiseNum: 520, //点赞人数
          audioUrl: '', //语音地址
          audioTime: 23, //语音时长
          commentHead: '', //评论人头像地址
          commentName: '古风流', //评论人名称
          commentTime: Date.now() //评论时间
        },
        {
          id: Date.now() + 3, //评论ID
          isPraised: true, //当前用户是否对评论点赞
          type: 0, //评论类型 0 文字  1 语音
          isExpand: false, //默认是否展开
          content:
            '此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论',
          review: '此处为老师回复内容此处为老师回复内容此处为老师回复内', //回复内容
          reviewer: '伍智老师：', //回复老师姓名
          praiseNum: 520, //点赞人数
          audioUrl: '', //语音地址
          audioTime: 23, //语音时长
          commentHead: '', //评论人头像地址
          commentName: '古风流', //评论人名称
          commentTime: Date.now() //评论时间
        }
      ]
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    navbarTap(index) {
      this.currentNav = index
      let positionId
      switch (index) {
        case 0:
          positionId = '#intro'
          break
        case 1:
          positionId = '#try'
          break
        case 2:
          positionId = '#message'
          break
        default:
          break
      }
      let anchor = this.$el.querySelector(positionId)
      document.body.scrollTop = anchor.offsetHeight - 40
      // // Firefox
      document.documentElement.scrollTop = anchor.offsetTop - 40
      // Safari
      window.pageYOffset = anchor.offsetTop - 40
    },
    ellipsis() {
      this.showall = !this.showall
    },
    handleScroll() {
      let scrollTop = Math.abs(
        this.$refs.detailmain.getBoundingClientRect().top
      )
      console.log(scrollTop)
      // let introPosition = this.$el.querySelector("#intro").offsetTop - 40;
      let tryPosition = this.$el.querySelector('#try').offsetTop - 40
      let messagePosition = this.$el.querySelector('#message').offsetTop - 40
      if (scrollTop < tryPosition) {
        this.currentNav = 0
      } else if (scrollTop > tryPosition && scrollTop < messagePosition) {
        this.currentNav = 1
      } else if (scrollTop > messagePosition) {
        this.currentNav = 2
      }
    }
  }
}
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
  z-index: 999;
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
.visionarrow {
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

.noticeBuyText {
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
.noticeBuyArea {
  margin-bottom: 200px;
}
.noticeBuyTextDetail {
  margin-top: 10px;
  color: rgb(128, 128, 128);
  font-weight: 400;
}
</style>
