<template>
  <div id="detailmain" ref="detailmain">
     <GroupHeader></GroupHeader>
    <img :src="visionDetail.coverPic" class="head" alt="">

    <div class="navbar">
      <span v-for="(nav,index) in navBars" :key="index" :class="currentNav==index?'item active':'item'" @click="navbarTap(index)">{{nav}}</span>
    </div>
    <!-- introduce -->
    <div id="intro" ref="intro" class="intro">
      <div class="info bottomline">
        <!-- <p class="infoText">【本课程建议9岁以上孩子学习】</p> -->
        <div :class=" showall?'textFold infoText fulltext':'textFold infoText detault'">{{visionDetail.description}}
        </div>
        <div :class="showall?'show hide':'show'">
          <img :src="showall?arrowUp:arrowDown" class="visionarrow" alt="" @click="ellipsis">
        </div>
      </div>
      <!-- outline -->
      <div class="outline bottomline">
        <div class="noticeBuyText">课程列表
          <span class="count">(共{{visionDetail.lessonCount}}讲)</span>
        </div>
         <videoBigimage :src="visionDetail.outlinePic" class="outlineImage"></videoBigimage>
        <img class="zoom" src="../../assets/vision_zoom.png" alt="">
      </div>
    </div>
    <!-- try -->
    <div id="try" ref="try" class="try bottomline">
      <DetailHeader title="试看课程" subtitle="全部" link='visionCourseList' />
      <SingleSetList :list='visionDetail.freeLessonList'></SingleSetList>
    </div>
    <!-- message -->
    <div id="message" ref="message" class="message bottomline" >
      <DetailHeader title="精选留言" link='videoCourseCmts' :params='{"courseId":id}' :subtitle="visionDetail.commentCount + '条'" />
      <div v-for="item of commentList" :key="item.id" class="comment-item">
        <comment-item :comment="item" />
      </div>
    </div>

    <div class="noticeBuyArea">
      <div class="noticeBuyText">
        购买须知
        <p class="noticeBuyTextDetail">
          {{visionDetail.buyIntro}}
        </p>
      </div>
    </div>
   <tools-navbar
                v-on:router-to-audition="routerToAudition"
                v-on:router-to-collage="routerToCollage"
                v-on:router-to-collect="routerToCollect"
                :price="['100','10']"
                collageText="拼团拼团"
                :collect='true'
                :collage='true'
            />
  </div>

</template>

<script>
import DetailHeader from '../../components/visionComponents/DetailHeader.vue'
import arrowUp from '../../assets/vison_arrow_up.png'
import arrowDown from '../../assets/vision_arrow_down.png'
import SingleSetList from '../../components/SingleSetList.vue'
import CommentItem from '../../components/comment/CommentItem.vue'
import toolsNavbar from '../../components/toolsNavbar.vue'
import GroupHeader from '../onlineCourse/components/GroupHeader'
import videoBigimage from '../../components/videoBigimage.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('visionData')
export default {
  components: {
    DetailHeader,
    videoBigimage,
    SingleSetList,
    CommentItem,
    toolsNavbar,
    GroupHeader
  },
  props: ['id'],
  data() {
    return {
      arrowUp,
      arrowDown,
      banner: '',
      navBars: ['介绍', '试听', '留言'],
      currentNav: 0,
      showall: false
    }
  },
  created() {
    this.getVisionDetail({courseId:this.id, groupBuyId: this.$route.query.groupById})
    this.getCommentList(this.id)
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: mapState(['visionDetail', 'commentList']),
  methods: {
    ...mapActions(['getVisionDetail', 'getCommentList']),
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
      let tryPosition = this.$el.querySelector('#try').offsetTop - 40
      let messagePosition = this.$el.querySelector('#message').offsetTop - 40
      if (scrollTop < tryPosition) {
        this.currentNav = 0
      } else if (scrollTop > tryPosition && scrollTop < messagePosition) {
        this.currentNav = 1
      } else if (scrollTop > messagePosition) {
        this.currentNav = 2
      }
    },
    routerToAudition() {
      console.log('跳转到试听')
    },
    routerToCollage() {
      console.log('跳转到拼团')
    },
    routerToCollect() {
      console.log('跳转到集赞')
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
  background-size: 100%;
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
