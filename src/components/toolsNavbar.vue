<template>
    <div class="purchase-toolbar" v-show="toolsObject&&toolsObject.isShow">
        <div class="toolbar-audition" @click="clickAuditionBtn">
            <i class="qhht-icon audition-icon"></i>
            <p class="under-text">{{serviceType == "1005"?'试看':'试听'}}</p>
        </div>
        <hr class="vertical-line"/>
        <div v-show="toolsObject&&toolsObject.originPrice" :disabled="isLoading" class="toolbar-price" :class="{'toolbar-price-active':toolsObject&&!toolsObject.collage&&!toolsObject.collect }"  @click="clickOriginPriceBtn">
            <p class="toolbar-price-num">￥{{toolsObject&&toolsObject.originPrice | formatPrice}}</p>
            <!-- <van-loading v-show="isLoading&&isClickOriginPriceBtn" class="pay_loading" color="black" /> -->
            <span class="under-text">{{isLoading && isClickOriginPriceBtn?'支付中...':'原价购买'}}</span>
        </div>
        <div v-show="toolsObject&&(toolsObject.collage || toolsObject.collect)" class="toolbar-btnGroup">
            <div v-show="toolsObject&&toolsObject.collage" class="toolbar-btn toolbar-btn-left" :disabled="isLoading" @click="clickCollageBtn">
                <div v-show="toolsObject&&toolsObject.groupPrice"  class="toolbar-btn-price">￥{{toolsObject&&toolsObject.groupPrice | formatPrice}}</div>
                <!-- <van-loading v-show="isLoading&&isClickCollageBtn" class="pay_loading" color="black" /> -->
                <div>{{isLoading&&isClickCollageBtn?'支付中...':toolsObject&&toolsObject.collageText}}</div>
            </div>
            <div v-show="toolsObject&&toolsObject.collect" class="toolbar-btn toolbar-btn-right" @click="clickCollectBtn">
                <div v-show="toolsObject&&toolsObject.originPrice" class="toolbar-btn-price">￥0.00</div>
                <div>{{toolsObject&&toolsObject.collectText}}</div>
            </div>
        </div>
        <Share :show="sharePageShow" :courseId="courseId" :columnType ="serviceType"  @close="cancelSharePage"></Share>
        <PhoneVerif v-if="isShowMobileDialog" @callback="bindIsShowMobileDialog(false)"></PhoneVerif>
    </div>

</template>

<script>
import Share from './share/Share'
import PhoneVerif from './PhoneVerif'
import {
  createNamespacedHelpers,
  mapState as rootState,
  mapActions as rootActions
} from 'vuex'
const {
  mapState,
  mapActions,
  mapMutations,
  mapGetters
} = createNamespacedHelpers('videoColumnDetailData/groupManagerData')
export default {
  name: 'ToolsNavbar',
  data() {
    return {
      //是否显示分享
      sharePageShow: false,
      //分享内容
      shareData: null,
      lastClickTime:0,
      //点击原价购买按钮
      isClickOriginPriceBtn:false,
      //点击拼团按钮
      isClickCollageBtn:false,
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
  beforeDestroy(){
    this.updateUserAccessStatus()
  },
  watch: {
    collectLikeId: function(newVal) {
      if (newVal != 0 && this.startPraiseFlag) {
        this.toggolePraiseFlag(false)
        this.$router.push({
          name: 'Praise',
          params: {
            courseId: this.$route.params.courseId,
            collectLikeId: newVal
          },
          query: { columnType: this.serviceType }
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
    userAccessStatus: function(value) {
     
    }
  },
  computed: {
    ...rootState(['url','columnDetail']),
    ...mapState([
      'isLoading',
      'userList',
      'collectLikeId',
      'isShowMobileDialog',
      'groupBuyId',
      'toolsObject',
      'userAccessStatus',
      'freeLesson', //试听对象
      'courseId', //专栏ID
      'startPraiseFlag',
      'serviceType',
      'leavePerson',
      'isGroupCurrent',
      'orderStatus',//当前订单状态
      'isOwner',    //是不是开团人 
      'isGroupCurrent', //当前用户是否在拼团列表
      'isFullStaff',//拼团是否已满
      'achievePayment',//当前用户是否完成支付
      'isAllPay',//拼团用户列表中的用户是否都完成支付
      'currUserStatus',//当前用户的支付状态
      'lessonsArray'//专栏下所有课程
    ]),
    ...mapGetters(['isFromShare', 'courseName'])
  },
  filters: {
    formatPrice: function(price) {
      if (!price) return ''
      if (price.toString().indexOf('.') != -1) return price
      else return price + '.00'
    }
  },
  methods: {
    ...rootActions([
      'getUserInfo',
      'setWxShareFriend',
      'setWxShareZone'
    ]),
    ...mapMutations(['bindIsShowMobileDialog', 'toggolePraiseFlag','updateUserAccessStatus']),
    ...mapActions([
      'startGroupBuy',
      'getCollectLike',
      'startCollectLike',
      'updateFatherData',
      'unlockCourse',
      'checkoutAuthorrization',
      'getAllLessons'
    ]),
    //点击试听按钮 跳转
    clickAuditionBtn() {
      if (this.freeLesson && this.freeLesson.length > 0) {
        const { id } = this.freeLesson[0]
        this.gotoInfoPage(id)
      } else {
        this.$toast('暂无试听课程')
      }
    },
    //点击原价购买按钮
    clickOriginPriceBtn() {
      if(this.isQuiklyClick())return 
      this.isClickCollageBtn = false
      this.isClickOriginPriceBtn = true
      if(this.isLoading) {
        this.$toast("正在调起支付...")
        return
      }  
      let params = { courseId: this.courseId, payType: 0 } 
      switch (this.userAccessStatus) {
        //没有购买和集赞行为
        case 0:
        case -3://拼团失败
          this.checkoutAuthorrization(params)
          break
        case 1001:
          if (this.lessonsArray && this.lessonsArray.length > 0) {
            const { id } = this.lessonsArray[0]
            this.gotoInfoPage(id)
          }
          break
      }
    },
    //点击拼团按钮
    clickCollageBtn() {
      if(this.isQuiklyClick())return
      this.isClickCollageBtn = true
      this.isClickOriginPriceBtn = false
      if(this.isLoading) { 
        this.$toast("正在调起支付...")
        return
      } 
      console.log("支付事件")
      let params = null
      console.log('是否来自分享'+ this.isFromShare)
      if(this.isFromShare){
        console.log('正常进入'+ this.orderStatus)
        //从分享进入
        switch(this.orderStatus){
          case 1201:
          break
          case 1204:
            //拼团失败,重新发起拼团
            params = {courseId: this.courseId, payType: 1}
            this.checkoutAuthorrization(params)
          break
          case 1203:
            //拼团成功
            if(this.isGroupCurrent){
              //当前用户在拼团用户列表中,显示我要学习,就解锁专栏,跳转到单集详情页
              if (this.lessonsArray && this.lessonsArray.length > 0) {
                   const { id } = this.lessonsArray[0]
                   this.gotoInfoPage(id)
              }
            }else {
              //当前用户不在用户列表中,就重新发起拼团
              params = {courseId: this.courseId, payType: 1}
              this.checkoutAuthorrization(params)
            }
          break
          case 1202:
            //拼团中
            //拼团中&&开团人  显示  邀请好友拼团
            if(this.isOwner){
              this.sharePageShow = true
              //拼装分享内容
              // this.setShareInfo()
            }
            //拼团中&& 参团人 && 如果拼团已满 && 当前用户已完成购买 && 存在其他人未完成支付  "立即邀请好友拼团"
            if(!this.isOwner&&this.isFullStaff&&this.achievePayment&&!this.isAllPay){
              this.sharePageShow = true
              //拼装分享内容
              // this.setShareInfo()
            }
            //拼团中&&参团人&&当前拼团未满&&当前用户完成支付   按钮显示:"邀请好友拼团"
            if (!this.isOwner && !this.isFullStaff && this.achievePayment){
              this.sharePageShow = true
              //拼装分享内容
              // this.setShareInfo()
            }
            //拼团中&&参团人&&当前拼团未满&&当前用户未调起支付   按钮显示:"参与拼团"
            if(!this.isOwner && !this.isFullStaff && !this.achievePayment && this.currUserStatus == 0){
              params = {groupBuyId: this.groupBuyId, payType: 2}
              this.checkoutAuthorrization(params)
            }
            //拼团中&&参团人&&当前拼团未满&&当前用户调起支付未支付完成   按钮显示:"继续支付"
            if(!this.isOwner && !this.isFullStaff && !this.achievePayment && this.currUserStatus == 2601){
              params = {groupBuyId: this.groupBuyId, payType: 2}
              this.checkoutAuthorrization(params)
            }
            //拼团中&&参团人&&当前拼团已满&&当前用户未完成支付&&当前用户不在拼团用户列表中  按钮显示"我要开团"
            if(!this.isOwner && this.isFullStaff && !this.achievePayment && !this.isGroupCurrent){
              params = {courseId: this.courseId, payType: 1}
              this.checkoutAuthorrization(params)
            }
            //拼团中&&参团人&&当前拼团已满&&当前用户未完成支付&&当前用户在拼团用户列表中  按钮显示"继续支付"
            if(!this.isOwner && this.isFullStaff && !this.achievePayment && this.isGroupCurrent){
              params = {groupBuyId: this.groupBuyId, payType: 2}
              this.checkoutAuthorrization(params)                 
            }
          break
        }
      }else{
        //正常进入
        console.log('正常进入'+ this.userAccessStatus)
        switch (this.userAccessStatus){
          case -3:
            //拼团失败,重新发起拼团 比如从我的拼团记录中点击一张失败的单子进入
            params = {courseId: this.courseId, payType: 1}
            this.checkoutAuthorrization(params)
          break
          case 0:
            //没有购买和集赞行为
            params = {courseId: this.courseId, payType: 1}
            this.checkoutAuthorrization(params)
          break
          case 1003:
            //拼团成功
            if (this.lessonsArray && this.lessonsArray.length > 0) {
                  const { id } = this.lessonsArray[0]
                  this.gotoInfoPage(id)
            }
          break
          case 1005:
            //拼团中
            this.sharePageShow = true
            //拼装分享内容
            // this.setShareInfo()
          break
        }
      }
    },
    //点击集赞按钮
    clickCollectBtn() {
      this.isClickCollageBtn = false
      this.isClickOriginPriceBtn = false
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
          if (this.lessonsArray && this.lessonsArray.length > 0) {
                   const { id } = this.lessonsArray[0]
                  this.gotoInfoPage(id)
          }
          break
        case 1009:
          //集赞中
          this.$router.push({
            name: 'Praise',
            params: {
              courseId: this.$route.params.courseId,
              collectLikeId: this.collectLikeId
            },
            query: {
              columnType: this.serviceType
            }
          })
          break
        case 0:
          //没有购买和集赞行为
          params = {
            courseId: this.courseId,
            payType: 3
          }
          this.checkoutAuthorrization(params)
          break
        case -3:
          //拼团失败后,此时工具条标准显示,此时可以发起集赞
          params = {
            courseId: this.courseId,
            payType: 3
          }
          this.checkoutAuthorrization(params)
          break
      }
    },
    isQuiklyClick(){
      if(Date.now()-this.lastClickTime < 1000){
        // this.$toast('按钮点击频率太高了...')
        this.lastClickTime = Date.now()
        return true
      }
      this.lastClickTime = Date.now()
      return false
    },
    //邀请好友拼团
    cancelSharePage() {
      this.sharePageShow = false
    }, 
    // setShareInfo() {
    //   let link = ''
    //   switch (this.serviceType) {
    //     case '1003':
    //       link =  `${this.url}#/videoColumnDetail/${this.courseId}?groupBuyId=${this.groupBuyId}`
    //       break
    //     case '1003':
    //       link =  `${this.url}#/home/visionDetail/${this.courseId}`
    //       break
    //     case '1007':
    //       link = `${this.url}/#/home/readings/book/${this.courseId}`
    //       break
    //     default:
    //       link =  `${this.url}/#/home/freezone`
    //       break
    //   }
    //   this.getUserInfo().then(user => {
    //     this.shareData = {
    //       link,
    //       title: `我正在参加《${ this.courseName}》拼团活动,仅差${this.leavePerson}人,快来和我一起拼团吧!`,
    //       imageUrl:`${this.columnDetail.sharePostUrl}?imageView2/1/w/100/h/100/format/jpg`,
    //       desc: '你一定会爱上国学课...'
    //     }
    //     this.setWxShareFriend(this.shareData)
    //     this.setWxShareZone(this.shareData)
    //   })  

    // },
    gotoInfoPage(id){   
      switch (this.serviceType) {
        case '1005':
          this.$router.push({
            name: 'videoCourseDetail',
            params: { lessonId: id }
          })
          break
        case 'FreeZone':
          break
        case '1003':
          this.$router.push({
            name: 'AudioPlay',
            params: { id },
            query: {courseId: this.courseId,  columnType: this.serviceType, courseName: this.courseName }
          })
          break
        case '1007':
          this.$router.push({
            name: 'AudioPlay',
            params: { id },
            query: {courseId: this.courseId,  columnType: this.serviceType, courseName: this.courseName }
          })
          break
      }
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
  width: 40px;
  height: 40px;
  background-image: url('../assets/images/onlinecourse-tabbar-try.png');
  background-position-y: top;
  background-size: 40px;
  margin-bottom: 4px;
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
  margin-right: 28px;
  line-height: 32px;
}
.toolbar-price-active {
  height: 80px;
  flex-grow: 1;
  background: linear-gradient(
    to right,
    rgb(254, 119, 0) 0,
    rgb(255, 79, 5) 100%
  );
  border-radius: 80px;
  padding: 10px 0;
  .toolbar-price-num {
    color: #fff;
  }
  .under-text {
    color: #fff;
  }
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
  position: relative;
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
.van-loading{
  position: absolute;
  left: 10px;
  width: 18px;
  height: 18px;
}
</style>
