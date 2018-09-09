<template>
    <div ref="father" class="videocourse-detail-container">
        <div class="video-detail-header">
            <div class="video-detail-header-right-top">
                <img :src="require('../../assets/images/onlinecourse_love_normal.png')" class="video-detail-collect" alt="">
                <img :src="require('../../assets/images/onlinecourse_video_detail_ic_editor.png')" class="video-detail-share" alt="">
            </div>

             <div class="video-detail-header-left-bottom">
                 <img :src="require('../../assets/images/onlinecourse-video-detail-header.jpg')" alt="" >
                 <label>开始播放</label>   
                 </div>
             <img :src="require('../../assets/images/onlinecourse_video_ic_gift.png')" class="video-detail-header-gift" alt="">    
        </div>

        <!-- <div class="switchModule"> -->
            <div ref="navbar" :class="navbarFixed == true ? 'isFixed' : ''" class="video-detail-navbar">
                <div v-for="(item,index) of navbar" :class="{'selected':selected == index }" :key="index" class="video-detail-navbar-item" @click="clickFnc(index)">{{item}}</div>
            </div>
        <!-- </div> -->


        <div class="video-detail-content">
            <div ref="note" class="video-detail-sction-title">
                <h4>笔记</h4>
           </div>
           <course-introduce/>
            <hr class="video-detail-line">
            <div class="video-detail-sction-title">
                <h4>自测题</h4>
            </div>
            <div class="video-detail-questions">
                <img :src="require('../../assets/images/onlinecourse-pic-share.png')" class="video-test-question-img" alt="">
            </div>
            <div class="video-test-question-title">共3道自测题</div>
            <mt-progress :value="20" :bar-height="4"/>
            <div class="video-test-question-warn">在学习n分钟可解锁自测题</div>
            <hr class="video-detail-line">
            <div ref="catalog" class="video-detail-sction-title">
                <h4>目录</h4>
            </div>
            <playlist v-for="(item,index) of dataList" :key="item.id" :iteminfo="item" :lastindex="index == (dataList.length - 1)"/>
            <hr class="video-detail-line">
            <div ref="leavemessage" class="video-detail-sction-title">
                <h4>留言</h4>
                <div class="video-detail-leavemessage">
                    <img src="../../assets/images/onlinecourse_video_detail_ic_editor.png" alt="">
                    <span>我要留言</span>
                </div>
            </div>
            <video-comment/>

        </div>
    </div>
</template>

<script>
import CourseIntroduce from '../../components/CourseIntroduce.vue'
import playlist from './components/playlist.vue'
import videoComment from '../../components/video-comment.vue'
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("videoCourseDetail");
export default {
  name: 'VideoColumnDetail',
  components: {
    'course-introduce': CourseIntroduce,
    playlist: playlist,
    'video-comment': videoComment
  },
  data() {
    return {
      navbar: ['资料', '目录', '留言'],
      navbarFixed: false, //控制navbar是否吸顶
      selected: 0,
      dataList: [
        {
          id: 0,
          isPlaying: true,
          title: '发刊词:为什么抱元没有食堂?',
          info: '史上最会钓鱼的老头'
        },
        {
          id: 1,
          isPlaying: false,
          title: '001 名画为什么这么值钱',
          info: '史上最会钓鱼的老头'
        },
        {
          id: 2,
          isPlaying: true,
          title: '002 斯大林格勒战役?',
          info: '史上最会钓鱼的老头'
        }
      ]
    }
  },
  computed: {
    ...mapState([          
        'lessonList',              //目录课程
        'originData',            //接口返回数据
        'videoBgImage',              //视频背景图
        'videoNote',                 //课程笔记
        'courseListImage',           //课程列表下面的大图展示
        'videoCourseComments'      //视频课程的留言  
    ]),
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  created(){
      //获取课程ID
      const lessonId = this.$route.params.lessonID
      this.getVideoCourseDetail({lessonId})
  },
  methods: {
    ...mapActions([
        'getVideoCourseDetail'
    ]),
    clickFnc(index) {
      this.selected = index
      console.log('currentindex=' + index)
      // var noteH = this.$refs.note.offsetTop;
      // var catalogH = this.$refs.catalog.offsetTop;
      // var leavemessageH = this.$refs.leavemessage.offsetTop;
      // console.log('noteH =' + noteH)
      // console.log('catalogH =' + catalogH)
      // console.log('leavemessageH =' + leavemessageH)
      // console.log(this.$refs)
      switch (index) {
        case 0:
          this.$refs.note.scrollIntoView({
            behavior: 'instant',
            block: 'center',
            inline: 'nearest'
          })
          break
        case 1:
          this.$refs.catalog.scrollIntoView({
            behavior: 'instant',
            block: 'center',
            inline: 'nearest'
          })
          break
        case 2:
          this.$refs.leavemessage.scrollIntoView({
            behavior: 'instant',
            block: 'center',
            inline: 'nearest'
          })
          break
      }

      // this.$refs.note.animate({ scrollTop : noteH },800)
      // this.$refs.catalog.animate({ scrollTop : catalogH },800)
      // this.$refs.leavemessage.animate({ scrollTop : leavemessageH },800)
    },
    async handleScroll() {
      //1.监听滚动
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      //2.获取navbar的偏移量
      var barOffset = this.$refs.navbar.offsetTop
      //    console.log(document.querySelector('.video-detail-navbar'))
      // console.log('===' + barOffset)
      // console.dir(this.$refs.navbar)
      this.navbarFixed = scrollTop > barOffset ? true : false

      var noteH = this.$refs.note.offsetTop
      const catalogH = this.$refs.catalog.offsetTop
      const leavemessageH = this.$refs.leavemessage.offsetTop
      if (scrollTop <= noteH) {
        console.log('----0----')
        this.selected = 0
      } else if (scrollTop < catalogH && scrollTop > noteH) {
        console.log('----1----')
        this.selected = 1
      } else if (scrollTop < leavemessageH && scrollTop > catalogH) {
        console.log('----2----')
        this.selected = 2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.videocourse-detail-container {
  background-color: #fff;
}
//header
.video-detail-header {
  width: 100%;
  height: 422px;
  background-color: rgb(198, 72, 172);
  position: relative;
}
.video-detail-header-right-top {
  position: absolute;
  top: 26px;
  right: 30px;
  display: flex;
  flex-direction: row;
}
.video-detail-collect {
  width: 36px;
  height: 30px;
}
.video-detail-share {
  width: 30px;
  height: 30px;
  margin-left: 24px;
}
.video-detail-header-left-bottom {
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  left: 30px;
  bottom: 30px;
  height: 60px;
  border: 1px solid lightgray;
  border-radius: 30px;
  width: 196px;

  label {
    color: white;
    font-size: 24px;
    height: 28px;
    line-height: 28px;
    padding: 0;
    margin: 0;
    align-self: center;
  }

  img {
    width: 20px;
    height: 26px;
    margin: 20px;
  }
}
.video-detail-header-gift {
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
}
//导航条

.video-detail-navbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  justify-content: space-around;
  border-bottom: 1px solid lightgray;
  box-sizing: border-box;
  padding-top: 28px;
  // padding-bottom: 28px;
  text-align: center;

  &.isFixed {
    position: fixed;
    top: 0;
    z-index: 999;
  }

  .video-detail-navbar-item {
    width: 100px;
    padding-bottom: 22px;
    font-size: 28px;
    color: rgb(62, 62, 83);
  }

  .video-detail-navbar-item.selected {
    font-size: 28px;
    color: rgb(255, 163, 47);
    border-bottom: 6px solid rgb(255, 163, 47);
  }
}

//分割线
.video-detail-line {
  margin-left: -40px;
  width: 113%;
  height: 8px;
  background-color: rgb(247, 247, 247);
  border: none;
}
//content
.video-detail-content {
  padding: 0 40px;
}
.video-detail-sction-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 32px;
  text-align: left;
  color: rgb(62, 62, 83);
  margin-top: 48px;

  h4 {
    font-size: 32px;
    color: rgb(62, 62, 83);
  }
}
//自测题
.video-detail-questions {
  text-align: center;
  width: 100%;
  img {
    width: 298px;
    height: 252px;
  }
}
.video-test-question-title {
  margin-top: 30px;
  margin-bottom: 88px;
  text-align: center;
}

.video-test-question-warn {
  margin: 15px auto 48px;
  text-align: center;
}
//我要留言
.video-detail-leavemessage {
  width: 220px;
  height: 60px;
  border-radius: 30px;
  background-color: rgb(247, 247, 247);
  display: flex;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    margin: 16px 12px 16px 30px;
  }

  span {
    font-size: 32px;
    color: rgb(255, 163, 47);
  }
}
</style>
