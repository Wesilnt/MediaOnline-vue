<template>
    <div class="video-comment-container">
        <div class="video-comment-usericon">
            <img :src="comment.fromAvatarUrl">
        </div>
        <div class="video-comment-userinfo">
            <div class="video-userinfo-top">
                <div class="video-userinfo-top-left">
                    <span class="video-comment-nickname">{{comment.fromNickName}}</span>
                    <span class="video-comment-comTime">08-08</span>
                </div>
                <div class="video-comment-praise">
                    <img :src="isPraise ? praiseHighlight : praiseNormal" @click="onClickPraise">
                    <span>{{comment.likeCount}}</span>
                </div>
            </div>

            <div :class="showTotal ? 'total-comment' : 'detail-comment'">
              <div class="intro-content" res="desc">
                <span class="video-comment-detail">
                  {{comment.content}}
                </span>
                <div class="video-comment-totalBtn" @click="showTotalIntro" v-if="showExchangeBtn">
                  <p>{{exchangeBtn ? '全部' : '收起'}}</p>
                </div>
              </div>
            </div>


            <div class="video-comment-replay" v-if="regionType==2201" >
                  单集名称
            </div>
            <div class="video-comment-replay" v-else-if="regionType==2202" >
                <span class="video-comment-replay-name">{{comment.childComment.fromNickName}}回复{{comment.fromNickName}}:</span>
                {{comment.childComment.content}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    comment: {
      default: {}
    }
  },
  data() {
    return {
      praiseNormal: require('../assets/images/icon_praise_selected.png'),
      praiseHighlight: require('../assets/images/icon_praise_normal.png'),
      isPraise: false,
      regionType: 2201, //2201 专栏评论  2202 单集评论
      showTotal: true, //是否显示所有文本内容
      exchangeBtn: true, //显示展开还是收起
      showExchangeBtn: false //是否显示展开收起按钮
    }
  },
  methods: {
    onClickPraise() {
      this.isPraise = !this.isPraise
    },
    showTotalIntro() {
      this.showTotal = !this.showTotal
      this.showExchangeBtn = !this.showExchangeBtn
    }
  }
}
</script>

<style lang="scss" scoped>
.video-comment-container {
  width: 100%;
  display: flex;
  flex-direction: row;
}
.video-comment-usericon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  // background-color: red;
  margin-top: 40px;
  margin-right: 32px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: none;
  }
}
.video-comment-userinfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 48px;
  flex: 1;
  text-align: left;
}
.video-userinfo-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
}
.video-userinfo-top-left {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.video-comment-nickname {
  color: rgb(128, 128, 128);
  font-size: 32px;
  margin-right: 24px;
}
.video-comment-comTime {
  color: rgb(178, 178, 178);
  font-size: 22px;
}
.video-comment-praise {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.video-comment-praise img {
  height: 40px;
  width: 40px;
}
.video-comment-praise label {
  font-size: 28px;
  color: rgb(255, 163, 47);
}

//评论内容
.total-comment {
  height: auto;
  overflow: hidden;
  font-size: 28px;
  color: rgb(51, 51, 51);
  margin: 10px;
}

.detail-comment {
}

.video-comment-detail {
  height: 100%;
  font-size: 28px;
  color: rgb(51, 51, 51);
  margin-bottom: 8px;
}
.video-comment-totalBtn {
  font-size: 28px;
  color: rgb(255, 149, 33);
  text-align: right;
}
.video-comment-replay {
  margin: 20px;
  background-color: rgba(247, 247, 247, 0.5);
  color: rgb(51, 51, 51);
  font-size: 28px;
}
.video-comment-replay-name {
  font-size: 28px;
  color: rgb(128, 128, 128);
}
</style>
