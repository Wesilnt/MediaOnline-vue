<template>
    <div class="videocol-dec-container">
       <div class="videocol-header" :style="{ background : 'url('+profilePic+')' }">
           <div class="videocol-header-title">孩子的第一堂课</div>
           <div class="videocol-header-bottom">
               <label>你一定会喜欢的国学课</label>
               <label>999人已购买</label>
           </div>
       </div>

        <div class="videocol-navbar">
            <div v-for="(item,index) of navbar" :class="{'selected':selected == index }" :key="index" class="videocol-navbar-item" @click="clickFnc(index)">{{item}}</div>
        </div>

        <tools-navbar :btnstate="0"/>

       <div class="videocol-content">
           <course-introduce :courseinfo="description"/>
           <hr class="lineone">
            <div class="videocol-sction-title">
                <h4>课程列表 <label>(共{{lessonCount}}讲)</label></h4>
           </div>
            <div class="videocol-bigimage">
                <vue-bigimage :src="outlinePic"/>   
                <img :src="require('../../assets/images/onlinecourse_bigimage_search.png')" class="videocol-bigimage-search">
            </div>
            <hr class="lineone">
            <div class="videocol-sction-title">
                <h4>试看课程</h4>
                <div class="videocol-all" @click="allFunc">
                    <span class="videocol-allbtn">全部</span>
                    <img :src="require('../../assets/images/onlinecourse_arrow_right.png')" class="videocol-allbtn-icon">
                </div>
           </div>

            <playlist v-for="(item,index) of freeLessonList" :key="item.id" :iteminfo="item" :lastindex="index == (dataList.length - 1)" @jumpEvent="gotoVideoCourseDetailPage(item.id)"/>


            <hr class="lineone">
            <div class="videocol-sction-title">
                <h4>精选留言</h4>
                <div class="videocol-all" @click="allFunc">
                    <span class="videocol-allbtn">{{commentCount}}条</span>
                    <img :src="require('../../assets/images/onlinecourse_arrow_right.png')" class="videocol-allbtn-icon">
                </div>
           </div>
           <video-comment v-for="item of videoColumnComments" :key="item.id" :comment="item"/>
            <hr class="lineone">
            <div class="videocol-sction-title">
                <h4>购买须知</h4>
           </div>
           <div class="videocol-purchase-tip-fatherView">
               <p v-html="buyIntro"></p>
                <!-- <div v-for="item of purchaseList" :key="item.id" class="videocol-purchase-tip">{{item.id + '.' + item.info}}</div> -->
           </div>

            
       </div>
    </div>
</template>

<script>
import CourseIntroduce from '../../components/CourseIntroduce.vue'
import playlist from './components/playlist.vue'
import videoComment from '../../components/video-comment.vue'
import toolsNavbar from '../../components/toolsNavbar.vue'
import videoBigimage from '../../components/videoBigimage.vue'
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("videoColumnDetail");

export default {
    name: 'VideoColumnDetail',
    components: {
        'course-introduce': CourseIntroduce,
        playlist: playlist,
        'video-comment': videoComment,
        'tools-navbar': toolsNavbar,
        'vue-bigimage': videoBigimage
    },
    data() {
        return {
            navbar: ['介绍', '试看', '留言'],
            selected: 0,
            dataList: [
                
            ]   
        }
    },
    watch:{

    },
    computed: {
        ...mapState([          
            'freeLessonList',              //试看课程数组
            'profilePic',                 //头图
            'description',           //专栏介绍
            'outlinePic',           //课程列表下面的大图展示
            'videoColumnComments',       //视频专栏的留言
            'buyIntro',               //购买须知
            'lessonCount',                 //专栏课集总数
            'commentCount'            //留言总条数
        ]),
    },
   
    methods: {
        ...mapActions([
            "getVideoColumnDetail",
            "getCommentList"
        ]),

        clickFnc(index) {
            this.selected = index
        },
        allFunc() {
            console.log('点击全部')
        },
        gotoVideoCourseDetailPage(lessonID){
            console.log('路由跳转 lessonID = ' + lessonID)
            this.$router.push({name:'videoCourseDetail',params:{ lessonID }})
        }

    }, 

    created (){
        //获取专栏Id
        const courseId = this.$route.params.courseId 
        this.getVideoColumnDetail({courseId : courseId})
        //获取专栏评论列表
        this.getCommentList({regionType:2201,regionId:courseId,currentPage:1,pageSize:11})
    },
    mounted(){
        console.log('-=-=-=-=-=-')
        console.log(this.lessonCount)
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
.videocol-header {
  width: 100%;
  height: 300px;
  background-color: rgb(198, 72, 172);
  padding: 0 40px;
  box-sizing: border-box;
  text-align: left;
  .videocol-header-title {
    padding-top: 168px;
    margin-bottom: 20px;
    font-size: 36px;
    color: rgb(255, 255, 255);
  }
}

.videocol-header-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 28px;
  color: rgb(255, 255, 255);
  // &:nth-child(1) {

  // }
  // &:nth-child(2) {

  // }
}

//导航条
.videocol-navbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-bottom: 1px solid lightgray;
  box-sizing: border-box;
  margin-top: 28px;
  margin-bottom: 28px;
  text-align: center;
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

///////////////////////////
.videocol-content {
  padding: 0 40px;
  background-color: #fff;
  a {
    text-decoration: none;
  }
}

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

//分割线
.lineone {
  margin-left: -40px;
  margin-right: -40px;
  width: auto;
  height: 8px;
  background-color: rgb(247, 247, 247);
  border: none;
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
//大图浏览
.videocol-bigimage {
  position: relative;
  width: 100%;
  height: 800px;
  margin-bottom: 40px;
  background-color: #fff;
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
  right: 20px;
  bottom: 20px;
}

// .playlist_fatherView{
//     border-bottom:1px solid lightgray;
// }
// .playlist_fatherView:not(:last-child) {
//     border-bottom:1px solid lightgray;
// }

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
.videocol-purchase-tip {
  font-size: 32px;
  color: rgb(128, 128, 128);
  margin: 20px 0 20px;
}
.videocol-purchase-tip-fatherView {
  width: 100%;
}
.videocol-purchase-tip-fatherView :last-child {
  margin-bottom: 260px;
}
</style>
