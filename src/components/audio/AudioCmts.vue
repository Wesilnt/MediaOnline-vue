<template>
  <div class="comments-container">
    <!-- 全部留言 -->
    <div class="commment-list">
      <div class="comment-item" v-for="(item,i) of comments" :key="item.id">
        <div class="comment-header">
          <img src="../../assets/cmt_item_header.png">
        </div>
        <div class="comment-detail">
          <div class="top-container">
            <div class="username-date">
              <h2>谷风流</h2>
              <h5>08-08</h5>
            </div>
            <div class="thumb-container" @click="onPraise(i)">
              <img :src="item.isPraised?require('../../assets/cmt_praise_selected.png'):require('../../assets/cmt_praise_normal.png')">
              <span>1314</span>
            </div>
          </div>
          <div class="center-container">
            <div v-if="item.isVoice" class="text-container">
              <p :class="{fold:!item.isExpand}">此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论</p>
              <span @click="item.isExpand=true" v-if="!item.isExpand">全文</span>
            </div>
            <div v-else class="voice-container">
              <img src="../../assets/cmt_voice_icon.png">
              <span>6"</span>
            </div>

          </div>
          <div class="bottom-container">
            <font>伍智老师：</font>
            此处为老师回复内容此处为老师回复内容此处为老师回复内容此处为老师回复内容此处为老师回复内容此处为老师回复内容
          </div>
        </div>
      </div>
    </div>
    <!-- 评论按钮 -->
    <div class="comment-publish">
      <div class="comment-method" @click="onCommentMethod">
        <img :src="isSpeak?require('../../assets/audio_cmt_text.png'):require('../../assets/audio_cmt_speak.png')">
      </div>
      <div class="comment-button" :class="{touched:isSpeaking}">
        <p v-if="isSpeak" class="speak-btn" @touchstart.prevent="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
          {{isSpeaking?'松开&nbsp;结束':'按住&nbsp;说话'}}
        </p>
        <textarea v-else rows="1" placeholder="写评论" v-model="commentContent"></textarea>
      </div>
      <div v-if="!isSpeak" class="comment-send" @click="onSendComment">
        <img :src="commentContent.length<=0?require('../../assets/cmt_send_unable.png'):require('../../assets/cmt_send_abled.png')">
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      comments: [
        {
          id: Date.now() + 1,
          isPraised: true,
          isVoice: false,
          isExpand: false
        },
        { id: Date.now() + 2, isPraised: false, isVoice: true, isExpand: false }
      ],
      isSpeak: true,
      isSpeaking: false,
      commentContent: ""
    };
  },
  methods: {
    //切换评论方式
    onCommentMethod() {
      this.isSpeak = !this.isSpeak;
    },
    //输入或者录入评论
    onInputeComment() {},
    //发送评论
    onSendComment() {
      Toast("发布评论成功");
    },
    //点赞
    onPraise(index) {
      let isPraised = this.comments[index].isPraised;
      this.comments[index].isPraised = !isPraised;
      Toast(isPraised ? "取消点赞" : "点赞成功");
    },
    lookWhole() {},
    handleTouchStart(e) {
      console.log(e);
    },
    handleTouchMove(e) {
      console.log(e);
    },
    handleTouchEnd(e) {
      console.log(e);
    }
  }
};
</script>
<style lang='scss'>
.commment-list {
  display: flex;
  flex-direction: column;
  .comment-item {
    display: flex;
    flex-direction: row;
    padding: 40px 40px 0;
  }
  .comment-header {
    width: 80px;
    height: 80px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  .comment-detail {
    display: flex;
    flex-direction: column;
    margin-left: 32px;
  }
  .top-container {
    display: inline-flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .username-date {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
    h2 {
      margin: 0;
      font-size: 32px;
      line-height: 32px;
      color: rgb(128, 128, 128);
    }
    h5 {
      vertical-align: bottom;
      margin: 0 0 0 24px;
      font-size: 22px;
      line-height: 22px;
      align-self: flex-end;
      color: rgb(179, 179, 179);
    }
    .thumb-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-self: flex-end;
    }
    .thumb-container img {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }
    .thumb-container span {
      color: rgb(255, 163, 47);
      font-size: 28px;
      line-height: 28px;
    }
  }
  .center-container {
    margin-top: 24px;
    .text-container {
      font-size: 28px;
      color: rgb(51, 51, 51);
      line-height: 48px;
      display: flex;
      flex-direction: column;
      letter-spacing: 1px; /*no*/
      p {
        margin: 0;
      }
      span {
        font-size: 28px;
        color: rgb(255, 149, 33);
        text-align: right;
      }
      .fold {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
    .voice-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background-color: rgb(255, 205, 126);
      border-radius: 180px;
      width: 180px;
      height: 60px;
      align-items: center;
      padding: 20px;
    }
    .voice-container img {
      width: 20px;
      height: 30px;
    }
    .voice-container span {
      color: white;
      font-size: 30px;
    }
  }
  .bottom-container {
    margin-top: 28px;
    font-size: 28px;
    letter-spacing: 1px; /*no*/
    background-color: rgba(247, 247, 247, 0.5);
  }
  .bottom-container font {
    color: rgb(179, 179, 179);
    font-size: 36px;
  }
}

.comment-publish {
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: row;
  padding: 20px 20px;
  width: 100%;
  height: 120px;
  background-color: rgb(247, 247, 247);
  align-items: center;
  justify-content: space-between;
  .comment-method {
    display: flex;
    img {
      align-self: center;
      width: 64px;
      height: 64px;
    }
  }
  .comment-button {
    flex-grow: 1;
    border: 1px solid rgb(204, 204, 204); /*no*/
    border-radius: 120px;
    overflow: hidden;
    height: 100%;
    margin: 20px;
    background-color: rgb(242, 242, 242);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    textarea {
      line-height: 64px;
      padding-left: 20px;
      overflow: hidden;
      font-size: 26px;
      width: 100%;
      height: 100%;
      color: rgb(128, 128, 128);
      border: none;
      background-color: transparent;
      outline: none;
    }
    .speak-btn {
      color: rgb(102, 102, 102);
      font-size: 26px;
      width: 100%;
      padding: 40px;
      text-align: center;
      background-color: transparent;
    }
  }
  .touched {
    background-color: rgb(204, 204, 204);
  }
  .comment-send {
    width: 64px;
    height: 64px;
    img {
      width: 64px;
      height: 64px;
    }
  }
}
</style>
