<template>
  <div class="praise-container">
    <!-- 1. 头部封面图 -->
    <!-- <div class="praise-header">
            <img src="../../images/praise_head_bg.png">
        </div> -->
    <!-- 2. 点赞信息 -->
    <div class="thumbs-detail">
      <!-- 2.1 集赞人提示 -->
      <div class="people-container">
        <img src="../../assets/cmt_item_header.png" alt="">
        <div class="help-tip">
          <span>{{praiseDesc}}</span>
        </div>
      </div>
      <!-- 2.2 点赞/集赞 操作按钮 -->
      <div class="btn-container">
        <priasebtn :state="state" @share="onShare"/>
      </div>
      <!-- 2.3 集赞人数提示 -->
      <div class="number-container">
        暂时没人为你点赞，快去分享吧～
      </div>
      <hr>
      <!-- 2.4 点赞人列表 -->
      <div class="people-list">
        <div class="people-item" v-for="(item, index) in peoples" :key="index">
          <img class="icon" src="../../assets/praise_header_bg.png">
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
    <praise-explain v-if="showExplain" @close="closeExplain"/>
    <!-- 分享框 -->
    <share-pop :show="showShare" @close="closeShare"/>
  </div>
</template>
<script>
import PraiseBtn from './PraiseBtns.vue'
import PraiseExplain from './PraiseExplain.vue'
import Share from '../../components/Share.vue'
export default {
  data() {
    return {
      showShare: false, //显示分享框
      showExplain: false,
      state: 1, //按钮状态
      praiseDesc: '', //提示语
      peoples: [
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' },
        { userAvatar: '' }
      ]
    }
  },
  created: function() {
    this._setBtnAndTips({ status: 1202 }, false, true)
  },
  components: {
    priasebtn: PraiseBtn,
    'praise-explain': PraiseExplain,
    'share-pop': Share
  },
  methods: {
    closeExplain() {
      //关闭集赞说明框
      this.showExplain = false
    },
    praiseExplain() {
      //显示集赞说明框
      this.showExplain = true
    },
    onShare() {
      //显示分享框
      this.showShare = true
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
      //10. 集赞失败：好友 未点赞  btnState:5
      if (status == 1204 && code == 1005 && !isCurrentUser && !isPraised) {
        btnState = 5
        praiseDesc = '呜呜呜...很遗憾，活动结束'
      }
      this.state = btnState
      this.praiseDesc = praiseDesc
    }
  }
}
</script>
<style lang="scss" scoped>
.praise-container {
  display: flex;
  flex-direction: column;
  background: url(../../assets/praise_bg.png) no-repeat;
  background-size: 100%;
  background-position-y: -20%;
  background-origin: 0;
  background-repeat: repeat-y;
  height: 100%;
  //1. 头部封面
  .praise-header img {
    height: 456px;
    width: 700px;
  }
  //2. 中间点赞详情 2.66666667%  = 20px/750px
  .thumbs-detail {
    background-color: white;
    border-radius: 24px;
    margin: 290px 2.66666667% 0;
    // 2.1 集赞人提示  4.22535211% = 30px/710px
    .people-container {
      margin: 4.22535211% 4.22535211% 0;
      display: flex;
      flex-direction: row;
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
      flex-direction: row;
      align-items: center;
      border-radius: 80px;
    }
    .help-tip span {
      font-size: 30px;
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
    padding: 46px 20px 30px;
    justify-content: space-around;
    align-items: center;
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
}
</style>
