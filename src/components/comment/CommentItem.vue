<template>
  <div class="comments-container">
    <!-- 全部留言 -->
    <div class="qhht-flex comment-item" :style="{padding:'0px '+unindent?0:40+'px 48px'}">
      <img :src="comment.fromAvatarUrl"  class="comment-avatar">
      <div class="comment-detail">
        <div class="qhht-flex comment-detail-header">
          <p class="comment-detail-nickName">{{comment.fromNickName}}</p>
          <p class="comment-detail-time">{{comment.createTime | dateFormat("MM-mm")}}</p>
          <div class="comment-thumb" @click="onPraise(!!comment.userCommentLikeId)">
            <i class="qhht-icon icon-praise" :style="{backgroundImage: `url(${comment.userCommentLikeId?praised:unPraise})`}"></i>
            <span>{{comment.likeCount+comment.virtualLikeCount}}</span>
          </div>
        </div>
        <div class="comment-detail-body">
          <div ref="content" v-if="comment.commentType==3301" class="comment-detail-content" :class="{'content-expand':isExpand}">
            <span ref="contentChild">{{comment.content | getSingleCourseName(false)}}</span>
          </div>
          <div v-else class="voice-container">
            <img src="../../assets/images/cmt_voice_icon.png">
            <span>{{comment.audioTime}}"</span>
          </div>
<<<<<<< Updated upstream
          <div v-if="needExpand" class="comment-expand-btn">
            <a @click="handleExpand(comment.id)">{{isExpand?"双起":"全文"}}</a>
          </div>
=======
          <div  class="comment-expand-btn">
            <a @click="handleExpand(comment.id)">{{isExpand?'收起':'全文'}}</a>
          </div> 

>>>>>>> Stashed changes
        </div>
        <div v-if="regiontype==2201" class="comment-detail-footer">
          <!-- <font>{{comment.content | getSingleCourseName()}}</font> -->
          {{comment.content | getSingleCourseName(true)}}
        </div>
        <div class="comment-detail-footer" v-else-if="regiontype===2202 && comment.childComment">
          <span class="comment-replyer">{{ comment.childComment.fromNickName}}</span>回复<span class="comment-replyer">{{comment && comment.fromNickName}}：</span>
          {{comment.childComment && comment.childComment.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import praised from '../../assets/images/icon_praise_selected.png'
import unPraise from '../../assets/images/icon_praise_normal.png'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('commentData')
export default {
  filters: {
    dateFormat: function(value) {
      const date = new Date(value)
      const y = date.getFullYear()
      const m = date.getMonth() + 1
      const d = date.getDate()
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    },
    getSingleCourseName: function(value, isCourseName) {
      const arr = value.split('=>')
      const lastIndex = arr.length - 1
      if (isCourseName) {
        return arr[lastIndex]
      } else {
        if (arr.length === 1) return arr[0]
        return arr.reduce((prev, item, index) => {
          return (prev +=
            lastIndex === index ? '' : (0 === index ? '' : '=>') + item)
        }, '')
      }
    }
  },
  props: {
    comment: { default: {} },
    unindent: { default: false },
    regiontype: { default: 2202 },
    lastindex: { default: false }
  },
  data() {
    return {
      needExpand: false,
      isExpand: false,
      unPraise,
      praised
    }
  },
  methods: {
    ...mapActions(['likeComment']),
    //点赞
    onPraise(praised) {
      if (praised) {
        return this.$toast({ message: '您已点赞' })
      }
      this.likeComment(this.comment.id)
    },
    handleExpand() {
      this.isExpand = !this.isExpand
    }
  }, 
  mounted() {
    setTimeout(() => {
      const { content, contentChild } = this.$refs
      let frameHeight =
        content.clientHeight <= 0 ? content.scrollHeight : content.clientHeight
      let contentHeight =
        contentChild.offsetHeight <= 0
          ? contentChild.scrollHeight
          : contentChild.offsetHeight
      if (frameHeight < contentHeight) {
        this.needExpand = true
      }
    }, 100) 
  }
}
</script>
<style lang='less' scoped>
.comments-container {
  font-size: 28px;
  color: #333;
}
.comment-item {
  padding: 48px 40px 48px;
}
.comment-avatar {
  width: 80px;
  height: 80px;
  align-self: start;
  border-radius: 50%;
}
.comment-detail {
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  flex: 1;
  &-nickName {
    min-height: 32px;
    font-size: 32px;
    font-weight: 700;
    color: #808080;
    margin-right: 24px;
    line-height: 40px;
    align-self: flex-end;
  }
  &-time {
    flex-grow: 1;
    font-size: 22px;
    line-height: 22px;
    color: #b2b2b2;
    align-self: flex-end;
  }
  &-body {
    padding-top: 20px;
  }
  &-content {
    max-height: 160px;
    overflow: hidden;
    word-break: break-all;
    transition: height 0.4s linear;
    font-size: 24px;
    line-height: 42px;
    &.content-expand {
      max-height: inherit;
      overflow: visible;
    }
  }
  &-footer {
    padding: 20px;
    background-color: #fbfbfb;
    margin-top: 24px;
    border-radius: 16px;
  }
}
.comment-thumb {
  color: #ffa32f;
  font-weight: 700;
  align-self: flex-end;
  display: flex;
  > span {
    align-self: flex-end;
    line-height: 28px;
    font-size: 28px;
  }
}
.icon-praise {
  width: 32px;
  height: 32px;
  margin-right: 12px;
  align-self: flex-end;
}
.comment-expand-btn {
  text-align: right;
  a {
    color: #ffa32f;
  }
}
.comment-replyer {
  color: #868686;
}
.van-toast--text {
  width: auto;
  min-width: 0;
}
</style>
