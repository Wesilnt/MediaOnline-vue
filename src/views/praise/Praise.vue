<template>
  <div class="praise-container">
    <!-- 1. 头部封面图 -->
    <div class="praise-header"/>
    <!-- 2. 点赞信息 -->
    <div class="thumbs-detail">
      <!-- 2.1 集赞人提示 -->
      <div class="people-container">
        <img :src="praiseDetail.starterAvatarUrl" alt="">
        <!-- <div class="help-tip"> -->
          <transition-group name="roller" class="help-tip">
            <span v-show="rollerFlag" :key="'tip'">{{praiseData.praiseDesc}}</span>
            <span v-show="!rollerFlag" :key="'time'">{{remainTime}}</span>
          </transition-group>
        <!-- </div> -->
      </div>
      <!-- 2.2 点赞/集赞 操作按钮 -->
      <div class="btn-container">  
        <priasebtn 
        :columntype="columnType"
        :state="praiseData.btnState" 
        :courseid="courseId" 
        :collectlikeid="collectLikeId"
         @share="onShare"/> 
      </div>
      <!-- 2.3 集赞人数提示 -->
      <div class="number-container">
        <span v-if="praiseData.isCurrentUser && praiseData.alreadyCount<=0">暂时没人为你点赞，快去分享吧～</span>
        <span v-else>已有{{praiseData.alreadyCount}}人帮{{praiseData.isCurrentUser?'你':'TA'}}点赞</span>
      </div>
      <hr>
      <!-- 2.4 点赞人列表 -->
      <div class="people-list">
        <div v-for="(item, index) in praiseData.praiseUsers" :key="index" class="people-item">
          <img class="icon" :src="item">
        </div>
      </div>
      <!-- 2.5 集赞有礼 -->
      <div class="praise-explain" @click="praiseExplain">
        如何玩转集赞有礼
      </div>
    </div>
    <!-- 3. 集赞有奖底部提示 -->
    <div class="bottom-container">
      <hr>
      <span>集赞有奖</span>
      <hr>
    </div>
    <!-- 集赞说明框 -->
    <PraiseExplain v-if="showExplain" @close="closeExplain"/>
    <!-- 分享框 --> 
    <share-pop :show="showShare" @close="closeShare" :sharetype="'praise'" :shareInfo="shareData" :shareid="collectLikeId"/> 
  </div>
</template>
<script>
import PraiseBtn from './PraiseBtns.vue'
import PraiseExplain from './PraiseExplain.vue'
import Share from '../../components/share/Share.vue'
import { createNamespacedHelpers ,mapActions as rootActions} from 'vuex'
const {
  mapState,
  mapMutations,
  mapActions,
  mapGetters
} = createNamespacedHelpers('praiseData')
export default {
  name: 'Praise',
  data() {
    return {
      columnType: this.$route.query.columnType, //专栏类型  FreeZone 免费专区 OnlineCourse 在线课堂  OnlineVision 在线视野  Readings 读书会
      interval: null,
      courseId: this.$route.params.courseId,
      collectLikeId: this.$route.params.collectLikeId,
      showShare: false,               //显示分享框
      showExplain: false,
      shareData: {}
    }
  },
  components: {
    priasebtn: PraiseBtn,
    PraiseExplain,
    'share-pop': Share
  },
  computed: {
    ...mapState(['praiseDetail', 'rollerFlag', 'remainTime']),
    ...mapGetters(['praiseData'])
  },
  created: function() {
    this._setBtnAndTips({ status: 1202 }, false, true) 
    // this.getUserByToken()
    this.getCollectDetail({ collectLikeId: this.collectLikeId }) 
  },
  methods: {
    ...rootActions(['getUserInfo']),
    ...mapActions([
      'getUserByToken',
      'startCollectLike',
      'joinCollectLike',
      'getCollectDetail'
    ]),
    ...mapMutations(['destroyInterval']),
    closeExplain() {
      //关闭集赞说明框
      this.showExplain = false
    },
    praiseExplain() {
      //显示集赞说明框
      this.showExplain = true
    },
    //设置分享参数
    onShare() {
     this.getUserInfo()
      .then(user=>{
        //显示分享框
        this.showShare = true
        //拼装分享内容
        this.shareData = {
          link: `/#/praise/active/${this.courseId}/${this.collectLikeId}`,
          title: `我是${user.nickName}, 我想免费领取《${this.praiseDetail?this.praiseDetail.course.name:'国学课'}》,求助攻~`,
          desc: '你一定会爱上国学课...',
          imgUrl:  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QUUzRkVFRjcwNDExMUU4ODVFMENBOEEwQzlGOTAwNiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QUUzRkVGMDcwNDExMUU4ODVFMENBOEEwQzlGOTAwNiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlBRTNGRUVENzA0MTExRTg4NUUwQ0E4QTBDOUY5MDA2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlBRTNGRUVFNzA0MTExRTg4NUUwQ0E4QTBDOUY5MDA2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+g7DPDAAAIa9JREFUeNrsXQm4z1X6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'
        }
      }) 
    },
    closeShare() {
      //关闭分享框
      this.showShare = false
    },
    //获取按钮显示和滚动提示文本 isPraised：当前用户是否已点赞， isCurrentUser：发起集赞用户是不是当前用户
    _setBtnAndTips: function(res, isPraised, isCurrentUser) {
      console.log(res)
      let btnState = 0
      let praiseDesc = '帮我点赞免费领取，求助攻'
      let code = res && res.code ? parseInt(res.code) : 0
      let status = res && res.status ? parseInt(res.status) : 0
      //1. 集赞中：发起人         btnState:0
      if (status == 1202 && isCurrentUser) {
        btnState = 0
        praiseDesc = '我想免费领取课程,来帮我点赞吧'
      }
      //2. 集赞中：好友 未点赞   btnState:1
      if (status == 1202 && !isCurrentUser && !isPraised) {
        btnState = 1
        praiseDesc = '帮我点赞免费领取，求助攻'
      }
      //3. 集赞中：好友 已点赞   btnState:2
      if (status == 1202 && !isCurrentUser && isPraised) {
        btnState = 2
        praiseDesc = '感谢你帮我点赞'
      }
      //4. 集赞完成：发起人 未领取  btnState:3
      if (status == 1203 && isCurrentUser) {
        btnState = 3
        praiseDesc = '集赞完成，感谢大家帮我点赞'
      }
      //5. 集赞完成：发起人 已领取  btnState:4
      if (status == 1205 && isCurrentUser) {
        btnState = 4
        praiseDesc = '集赞完成，感谢大家帮我点赞'
      }
      //6. 集赞失败：发起人     btnState:4
      if (status == 1204 && isCurrentUser) {
        btnState = 7
        praiseDesc = '呜呜呜...很遗憾，活动结束'
      }
      //7. 集赞完成未领取/已领取：好友 已点赞  btnState:5
      if ((status == 1203 || status == 1205) && !isCurrentUser && isPraised) {
        btnState = 5
        praiseDesc = '集赞完成，感谢您帮我点赞'
      }
      //8. 集赞完成未领取/已领取：好友 未点赞  btnState:5
      if ((status == 1203 || status == 1205) && !isCurrentUser && !isPraised) {
        btnState = 5
        praiseDesc = '集赞完成，感谢大家帮我点赞'
      }
      //9. 集赞失败：好友 已点赞  btnState:5
      if (status == 1204 && !isCurrentUser && isPraised) {
        btnState = 5
        praiseDesc = '活动结束，感谢你帮我点赞'
      }
      //10. 集赞失败：好友 未点赞  btnState:5
      if (status == 1204 && !isCurrentUser && !isPraised) {
        btnState = 5
        praiseDesc = '呜呜呜...很遗憾，活动结束'
      }
      //11. 集赞失败：好友 未点赞  btnState:5

      if (status == 1204 && code == 1005 && !isCurrentUser && !isPraised) {
        btnState = 5
        praiseDesc = '呜呜呜...很遗憾，活动结束'
      }
      this.state = btnState
      this.praiseDesc = praiseDesc
    }
  },
  beforeDestroy() {
    this.destroyInterval()
  }
}
</script>
<style lang="scss" scoped>
.praise-container {
  display: flex;
  flex-direction: column;
  background: url(../../assets/images/praise_bg.png) center 20%/100%;
  min-height: 100vh;
  //1. 头部封面
  .praise-header {
    position: absolute;
    width: 100%;
    top: -10vh; 
    height: 98%;
    background: url(../../assets/images/praise_bg.png) center 20%/100% repeat-y;
  }
  //2. 中间点赞详情 2.66666667%  = 20px/750px
  .thumbs-detail {
    z-index: 100;
    background-color: white;
    border-radius: 24px;
    margin: 290px 2.66666667% 0;
    min-height: 812px;
    display: flex;
    flex-direction: column;
    // 2.1 集赞人提示  4.22535211% = 30px/710px
    .people-container {
      margin: 4.22535211% 4.22535211% 0;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      position: relative;
    }
    .people-container img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      z-index: 100;
    }
    .help-tip {
      z-index: 99;
      margin-left: -80px;
      padding-left: 110px;
      height: 80px;
      width: 100%;
      background-color: rgb(255, 251, 236);
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-radius: 80px;
      overflow: hidden;
    }
    .help-tip span {
      position: absolute;
      font-size: 28px;
      line-height: 80px;
      color: rgb(85, 86, 87);
    }
    // 2.2 点赞/集赞 操作按钮 4.22535211% = 30px/710px
    .btn-container {
      display: flex;
      flex-direction: row;
      margin: 4.22535211% 4.22535211% 0;
      height: 96px;
      justify-content: space-between;
    }
    // 2.3 集赞人数提示
    .number-container {
      text-align: center;
      font-size: 28px;
      color: rgb(111, 111, 111);
      margin-top: 46px;
    }
    hr {
      height: 1px;
      border: none;
      margin: 36px 4.22535211% 0;
      background-color: rgb(240, 240, 240);
    }
    // 2.4 点赞人列表66.125
    //  5.35211268% = 38px/710px, 2.30769231%  = 15px/650px, 3.23943662% = 23px/710px
    //  10.17307692% = 66.125px/650px
    .people-list {
      padding: 30px 3.23943662% 0 5.35211268%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      flex: 1;
      .people-item {
        position: relative;
        width: 10.17307692%;
        height: 0;
        margin-right: 2.30769231%;
        margin-bottom: 2.30769231%;
        padding-bottom: 10.17307692%;
      }
      .people-item .icon {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .praise-explain {
      font-size: 26px;
      color: rgb(180, 180, 180);
      text-align: right;
      margin: 70px 5.35211268% 30px 0;
    }
  }
  //3. 底部点在提示
  .bottom-container {
    display: flex;
    flex-direction: row;
    padding: 46px 20px 15px;
    justify-content: space-around;
    align-items: center; 
    z-index: 100;
    hr {
      width: 176px;
      height: 1px; /*no*/
      background-color: rgb(240, 240, 240);
    }
    span {
      font-size: 30px;
      color: white;
    }
  }
  .roller-enter {
    transform: translateY(100%);
  }
  .roller-leave-to {
    transform: translateY(-100%);
  }
  .roller-enter-active,
  .roller-leave-active {
    transition: all 1s linear;
  }
}
</style>
