<template>
  <div class="comments-container">
    <!-- 全部留言 -->
    <div class="commment-list">
      <div v-for="item of comments" :key="item.id" class="comment-item">
         <comment-item :comment="item"/>
      </div>
    </div>
    <!-- 评论按钮 -->
    <div class="comment-publish">
      <div class="comment-method" @click="onCommentMethod">
        <img :src="isSpeak?require('../../assets/audio_cmt_text.png'):require('../../assets/audio_cmt_speak.png')">
      </div>
      <div :class="{touched:isSpeaking}" class="comment-button">
        <p v-if="isSpeak" class="speak-btn" @touchstart.prevent="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
          {{isSpeaking?'松开&nbsp;结束':'按住&nbsp;说话'}}
        </p>
        <textarea v-else v-model="commentContent" rows="1" placeholder="写评论"/>
      </div>
      <div v-if="!isSpeak" class="comment-send" @click="onSendComment">
        <img :src="commentContent.length<=0?require('../../assets/cmt_send_unable.png'):require('../../assets/cmt_send_abled.png')">
      </div>
    </div>
  </div>
</template>
<script>
import CommentItem from '../CommentItem.vue'
export default {
  components: {
    'comment-item': CommentItem
  },
  data() {
    return {
      comments: [
        {
          id: Date.now() + 1, //评论ID
          isPraised: true, //当前用户是否对评论点赞
          type: 0, //评论类型 0 文字  1 语音
          isExpand: false, //默认是否展开
          content:
            '此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论',
          review:
            '此处为老师回复内容此处为老师回复内容此处为老师回复内容此处为老师回复内容此处为老师回复内容此处为老师回复内容', //回复内容
          reviewer: '伍智老师：', //回复老师姓名
          praiseNum: 1314, //点赞人数
          audioUrl: '', //语音地址
          audioTime: 0, //语音时长
          commentHead: '', //评论人头像地址
          commentName: '古风流', //评论人名称
          commentTime: Date.now() //评论时间
        },
        {
          id: Date.now() + 2, //评论ID
          isPraised: true, //当前用户是否对评论点赞
          type: 1, //评论类型 0 文字  1 语音
          isExpand: false, //默认是否展开
          content:
            '此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论',
          review: '此处为老师回复内容此处为老师回复内容此处为老师回复内', //回复内容
          reviewer: '伍智老师：', //回复老师姓名
          praiseNum: 520, //点赞人数
          audioUrl: '', //语音地址
          audioTime: 23, //语音时长
          commentHead: '', //评论人头像地址
          commentName: '古风流', //评论人名称
          commentTime: Date.now() //评论时间
        },
        {
          id: Date.now() + 3, //评论ID
          isPraised: true, //当前用户是否对评论点赞
          type: 0, //评论类型 0 文字  1 语音
          isExpand: false, //默认是否展开
          content: '论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论此处为评论',
          review: '此处为老师回复内容此处为老师回复内容此处为老师回复内', //回复内容
          reviewer: '伍智老师：', //回复老师姓名
          praiseNum: 520, //点赞人数
          audioUrl: '', //语音地址
          audioTime: 23, //语音时长
          commentHead: '', //评论人头像地址
          commentName: '古风流', //评论人名称
          commentTime: Date.now() //评论时间
        }
      ],
      isSpeak: true,
      isSpeaking: false,
      commentContent: ''
    }
  },
  methods: {
    //切换评论方式
    onCommentMethod() {
      this.isSpeak = !this.isSpeak
    },
    //输入或者录入评论
    onInputeComment() {},
    //发送评论
    onSendComment() {
      Toast('发布评论成功')
    },
    //点赞
    onPraise(index) {
      let isPraised = this.comments[index].isPraised
      this.comments[index].isPraised = !isPraised
      Toast(isPraised ? '取消点赞' : '点赞成功')
    },
    lookWhole() {},
    handleTouchStart(e) {
      console.log(e)
    },
    handleTouchMove(e) {
      console.log(e)
    },
    handleTouchEnd(e) {
      console.log(e)
    }
  }
}
</script>
<style lang='scss'>
.commment-list {
  display: flex;
  flex-direction: column;
  padding-bottom: 160px;
  padding-top: 40px;
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
