<template>
    <div class="purchase-toolbar" v-show="toolsObject&&toolsObject.isShow">
        <div class="toolbar-audition" @click="clickAuditionBtn">
            <i class="qhht-icon audition-icon"></i>
            <p class="under-text">{{freeLesson.type == "video"?'试看':'试听'}}</p>
        </div>
        <hr class="vertical-line"/>
        <div v-show="toolsObject&&toolsObject.originPrice" :class="toolsObject&&toolsObject.collage==false&&toolsObject.collect==false ?'toolbar-price-active' :'toolbar-price'"  @click="clickOriginPriceBtn">
            <p class="toolbar-price-num">￥{{toolsObject&&toolsObject.originPrice | formatPrice}}</p>
            <span class="under-text">原价购买</span>
        </div>
        <div v-show="toolsObject&&(toolsObject.collage || toolsObject.collect)" class="toolbar-btnGroup">
            <div v-show="toolsObject&&toolsObject.collage" class="toolbar-btn toolbar-btn-left" @click="clickCollageBtn">
                <div v-show="toolsObject&&toolsObject.groupPrice"  class="toolbar-btn-price">￥{{toolsObject&&toolsObject.groupPrice | formatPrice}}</div>
                <div>{{toolsObject&&toolsObject.collageText}}</div>
            </div>
            <div v-show="toolsObject&&toolsObject.collect" class="toolbar-btn toolbar-btn-right" @click="clickCollectBtn">
                <div v-show="toolsObject&&toolsObject.originPrice" class="toolbar-btn-price">￥0.00</div>
                <div>{{toolsObject&&toolsObject.collectText}}</div>
            </div>
        </div>
        <Share :show="sharePageShow" :shareid="courseId" :shareInfo="shareData" @close="cancelSharePage"></Share>
        <PhoneVerif v-if="isShowMobileDialog" @callback="cancelDialog"></PhoneVerif>
    </div>
   
</template>

<script>
import Share from './share/Share'
import PhoneVerif from './PhoneVerif'
import { createNamespacedHelpers } from 'vuex'
const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('videoColumnDetail/groupManager')
export default {
  name: 'ToolsNavbar',
  data() {
    return {
      //是否显示分享
      sharePageShow: false,
      //分享内容
      shareData: null
    }
  },
  props: {
    originPrice: {
      type: String,
      default: '0'
    },
    collage: {
      type: Boolean,
      default: false
    },
    collect: {
      type: Boolean,
      default: false
    },
    groupPrice: {
      type: String,
      default: '0'
    },
    collageText: {
      default: '拼团购买'
    },
    collectText: {
      default: '发起集赞'
    }
  },
  components: {
    Share,
    PhoneVerif
  },
  watch: {
    collectLikeId: function(newVal,) {
      if (newVal != 0 && this.startPraiseFlag) {
        this.toggolePraiseFlag(false)
        this.$router.push({
          name: 'Praise',
          params: {
            courseId: this.$route.params.courseId,
            collectLikeId: newVal
          }
        })
      }
    },
    achieveOriginBuy: function(newVal) {
      if (newVal == true) {
        //原价购买完成跳转到单集详情页
        const lessonId = this.freeLessonList[0].id
        this.$router.push({ name: 'videoCourseDetail', params: { lessonId } })
      }
    },
    // isShowMobileDialog: function(newVal) {}
  },
  computed: {
    ...mapState([
      'userList',
      'collectLikeId',
      'isOwner',
      'isShowMobileDialog',
      'groupBuyId',
      'toolsObject',
      'userAccessStatus',
      'freeLesson',  //试听对象
      'courseId',    //专栏ID
      'startPraiseFlag'
    ])
  },
  filters: {
    formatPrice: function(price) {
      if (!price) return ''
      if (price.toString().indexOf('.') != -1) return price
      else return price + '.00'
    }
  },
  methods: {
    ...mapMutations(['bindIsShowMobileDialog','toggolePraiseFlag']),
    ...mapActions([
      'startGroupBuy',
      'getCollectLike',
      'startCollectLike',
      'updateFatherData',
      'unlockCourse',
      'checkoutAuthorrization'
    ]),
    //点击试听按钮 跳转
    clickAuditionBtn() {
      if(this.freeLesson.freeLessonList && this.freeLesson.freeLessonList.length > 0) {
        if(this.freeLesson.type == "video"){
          const lessonId = this.freeLesson.freeLessonList[0].id
          this.$router.push({ name: 'videoCourseDetail', params: { lessonId } })
        }else {
          const id = this.freeLesson.freeLessonList[0].id
          this.$router.push({ name: 'AudioPlay', params: { id } })       
        }
      }
    },
    //点击原价购买按钮
    clickOriginPriceBtn() {
      let params = {
        courseId: this.courseId,
        payType: 0
      }
      this.checkoutAuthorrization(params)
    },
    //点击拼团按钮
    clickCollageBtn() {
      let params = null
      if (this.isOwner) {
        //发起拼团
        params = {
          courseId: this.courseId,
          payType: 1
        }
      } else {
        //参与拼团
        params = {
          groupBuyId: this.groupBuyId,
          payType: 2
        }
      }
      console.log('userAccessStatus =', this.userAccessStatus)
      switch (this.userAccessStatus) {
        case -3:
          //拼团失败,重新发起拼团
          this.checkoutAuthorrization(params)
          break
        //没有购买和集赞行为
        case 0:
          this.checkoutAuthorrization(params)
          break
        case 1003:
          this.clickAuditionBtn()
          //拼团成功.解锁专栏,跳转到单集详情页
          // if(this.freeLesson.freeLessonList){
          //   const lessonId = this.freeLessonList[0].id
          //   this.$router.push({ name: 'videoCourseDetail', params: { lessonId } })
          // }else
          // {
          //   console.log('没有试听课程')
          // }
          break
        case 1005:
          //拼团中
          this.sharePageShow = true
          //拼装分享内容
          const shareData = {
            link: `/#/videoColumnDetail/${this.courseId}?groupBuyId=${
              this.groupBuyId
            }`,
            title: '视频分享',
            desc: '这是一个神奇的视频',
            imgUrl: ''
          }
          this.shareData = shareData
          break
      }
    },
    //点击集赞按钮
    clickCollectBtn() {
      let params = null
      switch (this.userAccessStatus) {
        case 1007:
          //集赞成功未领取
          params = {
            collectLikeId: this.collectLikeId
          }
          this.getCollectLike(params)
          break
        case 1008:
          //集赞成功已领取  解锁专栏 跳转到单集详情页
          const lessonId = this.freeLessonList[0].id
          this.$router.push({ name: 'videoCourseDetail', params: { lessonId } })
          break
        case 1009:
          //集赞中
          this.$router.push({
            name: 'Praise',
            params: {
              courseId: this.$route.params.courseId,
              collectLikeId: this.collectLikeId
            }
          })
          break
        case 0:
          //没有购买和集赞行为
          // params = {
          //   courseId: this.courseId
          // }
          // this.startCollectLike(params)
          let params = {
            courseId: this.courseId,
            payType: 3
          }
          this.checkoutAuthorrization(params)
          break
      }
    },
    //邀请好友拼团
    cancelSharePage() {
      this.sharePageShow = false
    },
    //关闭手机号收集框
    cancelDialog() {
      console.log('代码走到这里每有啊')
      this.bindIsShowMobileDialog(false)
    }
  }
}
</script>

<style scoped lang='less' >
@origin: #ffa32f;
.purchase-toolbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 2px solid #efefef;
  text-align: center;
  background-color: #fff;
  z-index: 3000;
}
.toolbar-audition {
  margin: 0 16px;
  line-height: 24px;
}
.audition-icon {
  width: 52px;
  height: 52px;
  background-image: url('../assets/images/onlinecourse-tabbar-try.png');
  background-position-y: top;
  background-size: 40px;
}
.under-text {
  font-size: 20px;
  color: #696969;
}
.vertical-line {
  height: 70px;
  width: 2px;
  border: none;
  margin-right: 28px;
  background-color: #efefef;
}
.toolbar-price {
  // margin-left: 28px;
  margin-right: 28px;
  line-height: 32px;
}
.toolbar-price-active {
  // margin-left: 28px;
  flex-grow: 1;
  margin-right: 28px;
  line-height: 32px;
  background: linear-gradient(
    to right,
    rgb(254, 119, 0) 0,
    rgb(255, 79, 5) 100%
  );
  border-radius: 80px;
}
.toolbar-price-num {
  font-weight: 700;
  color: @origin;
  font-size: 30px;
}
.toolbar-btnGroup {
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  border-radius: 80px;
  align-items: center;
  height: 80px;
  margin-right: 20px;
  text-align: center;
  font-size: 30px;
  overflow: hidden;
  color: #fff;
}
.toolbar-btn {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 10px 0;
}
.toolbar-btn-left {
  background: linear-gradient(
    to right,
    rgb(254, 202, 0) 0,
    rgb(254, 149, 2) 100%
  );
}
.toolbar-btn-right {
  background: linear-gradient(
    to right,
    rgb(254, 119, 0) 0,
    rgb(255, 79, 5) 100%
  );
}
.toolbar-btn-price {
  font-weight: 700;
  & + div {
    font-size: 20px;
  }
}
</style>
