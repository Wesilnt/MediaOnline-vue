<template>
  <div>
    <SkeletonFullScreen  v-if="renderLoading"/>
    <div v-else id="detailmain" ref="detailmain">
    <GroupHeader />
    <ScrollNavBar :bars="navBars" />
    <!-- introduce -->
    <div id="intro">
      <div  class="vision-wrapper">
        <div class="vision-body">
          <CourseIntroduce :courseinfo="visionDetail.description"  />
        </div>
      </div>
      <div class="vision-wrapper">
        <h3 class="vision-title">课程列表  <span class="vision-title-badge">(共{{visionDetail.lessonCount}}讲)</span></h3>
        <div class="vision-body">
          <videoBigimage :src="visionDetail.outlinePic"></videoBigimage>
        </div>
      </div>
    </div>

    <!-- try -->
      <div id="try" class="vision-wrapper">
        <DetailHeader title="试听课程" subtitle="全部" link='/home/visionDetail/visionCourseList' :courseId="courseId" :coursename="courseName"/>
        <SingleSetList
                :courseid="courseId"
                :list='visionDetail.freeLessonList'
                :singletype="'1003'"/>
      </div>
    <!-- message -->
      <div id="message" class="vision-wrapper">
        <DetailHeader title="精选留言" link='/videoCourseCmts' :courseId="courseId" :subtitle="visionDetail.commentCount + '条'" />
        <CommentList  :regionid="courseId" :regiontype="2201" :haspadding="true" ></CommentList>
      </div>
      <div class="vision-wrapper wrapper-last">
        <h3 class="vision-title">购买须知</h3>
        <div class="vision-body" v-html="visionDetail.buyIntro"></div>
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
</div>
</template>

<script>
import ScrollNavBar from '../../components/ScrollNavBar'
import DetailHeader from '../../components/visionComponents/DetailHeader.vue'
import arrowUp from '../../assets/images/arrow_up.png'
import arrowDown from '../../assets/images/arrow_down.png'
import SingleSetList from '../../components/SingleSetList.vue'
import CommentList from '../../components/comment/CommentList.vue'
import toolsNavbar from '../../components/toolsNavbar.vue'
import GroupHeader from '../onlineCourse/components/GroupHeader'
import videoBigimage from '../../components/videoBigimage.vue'
import CourseIntroduce from '../../components/CourseIntroduce.vue'
import SkeletonFullScreen from '../../components/SkeletonFullScreen.vue'
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
  'visionData'
)
export default {
  components: {
    DetailHeader,
    ScrollNavBar,
    videoBigimage,
    SingleSetList,
    CommentList,
    toolsNavbar,
    GroupHeader,
    CourseIntroduce,
    SkeletonFullScreen
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
    this.initDatas({
      courseId: this.courseId,
      groupBuyId: this.$route.query.groupById
    })
    this.getVisionDetail({
      courseId: this.courseId,
      groupBuyId: this.$route.query.groupById
    })
    this.getCommentList(this.courseId)
  },
  mounted() {
    // this.getUserInfo().then(user => {
    //拼装分享内容
    this.shareData = {
      link: this.url + `/#/home/visionDetail/${this.courseId}`,
      title: this.courseName,
      desc: '你一定会爱上国学课...',
      imgUrl: `${
        this.visionDetail.sharePostUrl
      }?imageView2/1/w/100/h/100/format/jpg`,
      successCB: () => console.log('分享回调成功'),
      cancelCB: () => console.log('分享回调失败')
    }
    this.setWxShareFriend(this.shareData)
    this.setWxShareZone(this.shareData)
    // })
  },
  computed: {
    ...rootState(['url']),
    ...mapState(['visionDetail', 'courseName', 'commentList', 'renderLoading'])
  },
  methods: {
    ...rootActions(['getUserInfo', 'setWxShareFriend', 'setWxShareZone']),
    ...mapActions(['getVisionDetail', 'getCommentList']),
    ...mapMutations(['initDatas']),
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
.vision-wrapper {
  border-bottom: 8px solid #f7f7f7;
  &.wrapper-last{
    padding-bottom: 200px;
  }
}
.vision-title {
  font-size: 32px;
  color: #3e3e53;
  padding: 48px 40px;
}
.vision-title-badge {
  font-size: 28px;
  color: #9ba1b0;
  font-weight: normal;
}
.vision-body {
  padding: 0 40px;
}
</style>
