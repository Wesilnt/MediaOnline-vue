<template>
  <div class="videocol-dec-container" id="detailmain" ref="detailmain">
    <GroupHeader></GroupHeader>
    <!-- Header -->
    <div class="videocol-header" :style="{ background : 'url('+profilePic+')' }">
      <span class="videocol-header-bottom">{{buyCount}}人已购买</span>
    </div>
    <!-- Navbar -->
    <div class="videocol-navbar" id="navbar" ref="navbar">
        <div v-for="(item,index) of navbar" :class="{'selected':selected == index }" :key="index" class="videocol-navbar-item" @click="clickFnc(index)">{{item}}</div>
    </div>
    <!-- 底部工具条 -->
    <tools-navbar
        v-on:router-to-audition="routerToAudition"
        v-on:router-to-collage="routerToCollage"
        v-on:router-to-collect="routerToCollect"
        :price="['100','10']"
        collageText="拼团拼团"
        :collect='true'
        :collage='true'
    />
    <!-- description(介绍) -->
    <div class="videocol-base">
       <course-introduce ref="desc" id="desc" :courseinfo="description"/>
    </div>
    <!-- 课程列表 -->
    <div class="videocol-bigimage">
      <div class="videocol-sction-title">
        <h4>课程列表 <label>(共{{lessonCount}}讲)</label></h4>
      </div>
      <vue-bigimage :src="outlinePic"/>   
      <img :src="require('../../assets/images/onlinecourse_bigimage_search.png')" class="videocol-bigimage-search">
    </div>
    <!-- 试看课程 -->
    <div class="videocol-base">
      <div class="videocol-sction-title" id="tryCourse" ref="tryCourse">
        <h4>试看课程</h4>
        <div class="videocol-all" @click="allFunc">
          <span class="videocol-allbtn">全部</span>
          <img :src="require('../../assets/images/onlinecourse_arrow_right.png')" class="videocol-allbtn-icon">
        </div>
      </div>
      <playlist v-for="(item,index) of freeLessonList" :key="item.id" :iteminfo="item" :lastindex="index === (freeLessonList.length - 1)" @jumpEvent="gotoVideoCourseDetailPage(item.id)"/>
    </div>
    <!-- 精选留言 -->
    <div class="videocol-base">
      <div class="videocol-sction-title" id="leavemessage" ref="leavemessage">
        <h4>精选留言</h4>
        <div class="videocol-all" @click="allFunc">
            <span class="videocol-allbtn">{{commentCount}}条</span>
            <img :src="require('../../assets/images/onlinecourse_arrow_right.png')" class="videocol-allbtn-icon">
        </div>
      </div>
      <commentitem class="video-column-comment" v-for="(item,index) of videoColumnComments" :key="index" :comment="item" :regiontype="2201"/>
    </div>
    <div class="videocol-base">
      <div class="videocol-sction-title">
        <h4>购买须知</h4>
      </div>
      <div class="videocol-purchase-tip-fatherView">
        <p v-html="buyIntro"></p>
      </div>  
    </div>
  </div>
</template>

<script>
import CourseIntroduce from '../../components/CourseIntroduce.vue'
import playlist from './components/playlist.vue'
import GroupHeader from './components/GroupHeader'
import videoComment from '../../components/video-comment.vue'
import CommentItem from '../../components/CommentItem.vue'
import toolsNavbar from '../../components/toolsNavbar.vue'
import videoBigimage from '../../components/videoBigimage.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('videoColumnDetail')

export default {
  name: 'VideoColumnDetail',
  components: {
    'course-introduce': CourseIntroduce,
    playlist: playlist,
    'video-comment': videoComment,
    'tools-navbar': toolsNavbar,
    'vue-bigimage': videoBigimage,
    commentitem: CommentItem,
    GroupHeader
  },
  data() {
    return {
      navbar: ['介绍', '试看', '留言'],
      selected: 0,
      navbarFixed: false, //控制navbar是否吸顶
      dataList: []
    }
  },
  watch: {},
  computed: {
    ...mapState([
      'freeLessonList', //试看课程数组
      'profilePic', //头图
      'description', //专栏介绍
      'outlinePic', //课程列表下面的大图展示
      'videoColumnComments', //视频专栏的留言
      'buyIntro', //购买须知
      'lessonCount', //专栏课集总数
      'commentCount', //留言总条数
      'buyCount'
    ])
  },
  methods: {
    ...mapActions(['getVideoColumnDetail', 'getCommentList']),
    allFunc() {
      console.log('点击全部')
    },
    gotoVideoCourseDetailPage(lessonId) {
      console.log('路由跳转 lessonID = ' + lessonId)
      this.$router.push({ name: 'videoCourseDetail', params: { lessonId } })
    },
    async handleScroll() {
      //1.监听滚动
      let scrollTop = Math.abs(
        this.$refs.detailmain.getBoundingClientRect().top
      )
      let tryCourseH = this.$el.querySelector('#tryCourse').offsetTop - 50
      let messageH = this.$el.querySelector('#leavemessage').offsetTop - 50
      if (scrollTop < tryCourseH) {
        this.selected = 0
      } else if (scrollTop < messageH && scrollTop > tryCourseH) {
        this.selected = 1
      } else if (scrollTop > messageH) {
        this.selected = 2
      }
    },
    clickFnc(index) {
      this.selected = index
      let positionId
      switch (index) {
        case 0:
          positionId = '#desc'
          break
        case 1:
          positionId = '#tryCourse'
          break
        case 2:
          positionId = '#leavemessage'
          break
        default:
          break
      }

      let anchor = this.$el.querySelector(positionId)
      document.body.scrollTop = anchor.offsetHeight - 50
      // // Firefox
      document.documentElement.scrollTop = anchor.offsetTop - 50
      // Safari
      window.pageYOffset = anchor.offsetTop - 50
    },
    routerToAudition() {
      console.log('跳转到试听')
    },
    routerToCollage() {
      console.log('跳转到拼团')
    },
    routerToCollect() {
      console.log('跳转到集赞')
      this.$router.push({ name: 'Praise', params: { "courseId" : this.$route.params.courseId } })
    }
  },

  created() {
    //获取专栏Id
    const courseId = this.$route.params.courseId
    this.getVideoColumnDetail({ courseId: courseId })
    //获取专栏评论列表
    this.getCommentList({
      regionType: 2201,
      regionId: courseId,
      currentPage: 1,
      pageSize: 11
    })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="scss" scoped>
.videocol-dec-container {
  margin: 0;
  padding: 0;
  background-color: #fff;
  height: 100%;
}
// Header
.videocol-header {
  width: 100%;
  height: 300px;
  background-color: rgb(198, 72, 172);
  padding: 0 40px;
  box-sizing: border-box;
  text-align: left;
  position: relative;
}

.videocol-header-bottom {
  position: absolute;
  bottom: 20px;
  right: 40px;
  font-size: 28px;
  color: red;
}

//导航条
.videocol-navbar {
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #fff;
  border-bottom: 1px solid lightgray;
  box-sizing: border-box;
  padding-top: 28px;
  text-align: center;
  z-index: 999;

  .videocol-navbar-item {
    width: 100px;
    padding-bottom: 22px;
    font-size: 28px;
    color: rgb(62, 62, 83);
  }

  .videocol-navbar-item.selected {
    font-size: 28px;
    color: rgb(255, 163, 47);
    border-bottom: 6px solid rgb(255, 163, 47);
  }
}
//介绍
.videocol-base {
  padding: 0 40px;
  background-color: #fff;
  border-bottom: 8px solid rgb(247, 247, 247);
}
//大图浏览
.videocol-bigimage {
  position: relative;
  padding: 0 40px;
  width: 100%;
  height: 800px;
  margin: 40px 0;
  background-color: #fff;
  border-bottom: 8px solid rgb(247, 247, 247);
}

.videocol-bigimage-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.videocol-bigimage-search {
  position: absolute;
  width: 80px;
  height: 80px;
  right: 40px;
  bottom: 40px;
}

//区头
.videocol-sction-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 32px;
  text-align: left;
  color: rgb(62, 62, 83);
  margin-top: 48px;
  align-items: center;
}

.videocol-sction-title h4 {
  margin: 0;
  font-size: 32px;
  color: rgb(62, 62, 83);
}
.videocol-sction-title h4 label {
  font-size: 28px;
  color: rgb(155, 161, 176);
}
//试看课程
.videocol-all {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.videocol-allbtn {
  margin-right: 20px;
  border: none;
  font-size: 24px;
  height: 24px;
  line-height: 24px;
  color: rgb(155, 161, 176);
}
.videocol-allbtn-icon {
  width: 16px;
  height: 28px;
}

//精选留言
.video-column-comment {
  margin: 56px 0 40px;
}

//购买须知
.videocol-purchase-tip {
  font-size: 32px;
  color: rgb(128, 128, 128);
  margin: 20px 0 20px;
}
.videocol-purchase-tip-fatherView {
  width: 100%;
}
.videocol-purchase-tip-fatherView :last-child {
  margin-bottom: 60px;
}

</style>
