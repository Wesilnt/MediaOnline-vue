<template>
  <div id="detailmain" ref="detailmain">
    <GroupHeader></GroupHeader>
    <!-- <img :src="visionDetail.coverPic" class="head" alt=""> -->

    <ScrollNavBar :bars="navBars" />
    <!-- introduce -->
    <div  class="intro">
      <div id="intro" class="info bottomline">
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
        <img class="zoom" src="../../assets/images/vision_zoom.png" alt="">
      </div>
    </div>
    <!-- try -->
    <div id="try" class="try bottomline">
      <DetailHeader title="试看课程" subtitle="全部" link='/home/visionDetail/visionCourseList' :courseId="courseId" :coursename="courseName"/>
      <SingleSetList :list='visionDetail.freeLessonList' :singletype="'OnlineVision'"></SingleSetList>
    </div>
    <!-- message -->
    <div id="message" class="message bottomline" >
      <DetailHeader title="精选留言" link='/videoCourseCmts' :courseId="courseId" :subtitle="visionDetail.commentCount + '条'" />
      <div v-for="item of commentList" :key="item.id" >
        <comment-item :comment="item"  class="vision_comment_item"/>
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
        :collage='true'/>
  </div>

</template>

<script>
import ScrollNavBar from '../../components/ScrollNavBar'
import DetailHeader from '../../components/visionComponents/DetailHeader.vue'
import arrowUp from '../../assets/images/vison_arrow_up.png'
import arrowDown from '../../assets/images/vision_arrow_down.png'
import SingleSetList from '../../components/SingleSetList.vue'
import CommentItem from '../../components/comment/CommentItem.vue'
import toolsNavbar from '../../components/toolsNavbar.vue'
import GroupHeader from '../onlineCourse/components/GroupHeader'
import videoBigimage from '../../components/videoBigimage.vue'
import { createNamespacedHelpers ,mapState as rootState,mapActions as rootActions} from 'vuex'
const { mapState, mapActions ,mapGetters} = createNamespacedHelpers('visionData')
export default {
  components: {
    DetailHeader,
    ScrollNavBar,
    videoBigimage,
    SingleSetList,
    CommentItem,
    toolsNavbar,
    GroupHeader
  },
  props: ['courseId'],
  data() {
    return {
      arrowUp,
      arrowDown,
      banner: '',
      navBars: [
        {
          title: '介绍',
          ref: 'intro'
        },
        {
          title: '试听',
          ref: 'try'
        },
        {
          title: '留言',
          ref: 'message'
        }
      ],
      showall: false
    }
  },
  created() {
    this.getVisionDetail({
      courseId: this.courseId,
      groupBuyId: this.$route.query.groupById
    })
    this.getCommentList(this.courseId)
  },
  mounted(){  
    this.getUserInfo()
    .then(user=>{ 
      //拼装分享内容
      this.shareData = {
        link: this.url + `/#/home/visionDetail/${this.courseId}`, 
        title: `我是${user.nickName}, 邀请你一起收听《${this.courseName}》`,
        desc: '你一定会爱上国学课...',
        successCB: () => console.log('分享回调成功') ,
        cancelCB: () =>  console.log('分享回调失败')
      } 
      this.setWxShareFriend(this.shareData)
      this.setWxShareZone(this.shareData)
    }) 
  },
  computed: { ...rootState(['url']), ...mapState(['visionDetail','courseName', 'commentList'])},
  methods: {
    ...rootActions(['getUserInfo','registerWxConfig', 'setWxShareFriend', 'setWxShareZone']),  
    ...mapActions(['getVisionDetail', 'getCommentList']),
    ellipsis() {
      this.showall = !this.showall
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
  // height: 800px;
  margin: 0 40px 40px;
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
.vision_comment_item {
  padding: 40px 48px;
}
</style>
