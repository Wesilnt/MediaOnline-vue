<template>
    <div class="question-container">
        <div v-if="grade">
            <div class="qhht-flex">
                <div class="question-to-review-item">
                    <p>{{questionLength}}</p>
                    <span>题数</span>
                </div>
                <div class="question-to-review-item">
                    <p>{{correct}}</p>
                    <span>答对</span>
                </div>
                <!--<div class="question-to-review-item">
                    <p>3</p>
                    <span>排行</span>
                </div>-->
            </div>
            <div class="qhht-flex">
                <a class="qhht-blockButton question-inner-btn" @click="handlePopupShow('reviewShow')">回顾自测题</a>
                <a class="qhht-blockButton question-inner-btn" @click="handlePopupShow('settlementShow')">查看成绩单</a>
            </div>
        </div>
        <div v-else>
            <img :src="deblock ?deblockIcon  : lockIcon" class="questions-state">
            <p class="questions-length">共{{questionLength}}道自测题</p>
            <button v-if="deblock" @click="openQuestionAnswer"  class="qhht-blockButton question-btn">开始答题</button>
            <div v-else>
                <van-progress
                        pivot-text=""
                        color="#FFA32F"
                        :percentage="progress"
                />
                <p class="questions-footer-text">再学习{{deblockTime}}秒可解锁自测题</p>
            </div>
        </div>
        <van-popup v-model="questionShow" position="right" class="answer-container" >
            <div class="answer-wrapper">
                <div  class="answer-btn-close">
                    <a @click="handlePopupHide('questionShow')">关闭</a>
                </div>
                <p class="answer-title">
                    {{questionInfo.headerTitle}}
                </p>
                <p class="answer-content">{{questionInfo.question}}</p>
                <ol class="animated"  :class="warnClass">
                    <li v-for="opt in opts" :key="opt" :class="{
                    'hasSelect-answer':questionInfo.userSelect
                    }">
                        <a
                            @click="handleAnswerClick(opt)"
                            class="qhht-flex answern-btn-option"
                            :class="[
                                {
                                    'option-selected':questionInfo.isCorrect,
                                    'error-anwser':questionInfo.userSelect===opt&&questionInfo.userSelect!==questionInfo.rightOpt,
                                    'correct-anwser':opt===`opt${questionInfo.rightOpt}`
                                }
                            ]"
                        >
                            <span>{{questionInfo[opt]}}</span>
                            <!-- <span class="answer-checked-percent">{{questionInfo.userSelect?questionInfo[`${opt}Pct`]+'%':''}}</span> -->
                            <!--<i  class="option-checked" :style="{width:questionInfo.userSelect?questionInfo[`${opt}Pct`]+'%':'0'}" ></i>-->
                            <!-- <span class="answer-checked-percent">{{questionInfo.userSelect?questionInfo[`${opt}Pct`]+'%':''}}</span> -->
                            <i  class="option-checked" :style="{width:opt===`opt${!questionInfo.userSelect?0:questionInfo.rightOpt}`?'100%':questionInfo.userSelect===opt?'100%':'0'}" ></i>
                        </a>

                    </li>
                </ol>
                <div class="answer-footer">
                    {{questionInfo.footerBadge}}
                </div>
            </div>

            <a  class="qhht-blockButton answer-btn-next" @click="handleNextClick">
                {{questionInfo.nextBtnText}}
            </a>
        </van-popup>
        <van-popup v-model="reviewShow" position="left" class="answer-container" >
            <div class="answer-wrapper">
                <van-swipe :loop="false" class="review-swipe" :show-indicators="false">
                    <van-swipe-item v-for="questionItem in questionList" :key="questionItem.id">
                        <p class="answer-title">
                            {{questionItem.answer===questionItem.rightOpt?'您答对啦':'您答错啦'}}
                        </p>
                        <p class="answer-content">{{questionItem.question}}</p>
                        <div v-for="opt in opts" :key="opt" class="hasSelect-answer">
                            <div
                                    class="qhht-flex answern-btn-option option-selected "
                                    :class="[
                                {
                                    'error-anwser':questionItem.answer!==questionItem.rightOpt &&  `opt${questionItem.answer}`===opt,
                                    'correct-anwser':opt===`opt${questionItem.rightOpt}`
                                }
                            ]"
                            >
                                <span>{{questionItem[opt]}}</span>
                                <!-- <span class="answer-checked-percent">{{questionInfo.userSelect?questionInfo[`${opt}Pct`]+'%':''}}</span> -->
                                <!--<i  class="option-checked" :style="{width:questionInfo.userSelect?questionInfo[`${opt}Pct`]+'%':'0'}" ></i>-->
                                <!-- <span class="answer-checked-percent">{{questionInfo.userSelect?questionInfo[`${opt}Pct`]+'%':''}}</span> -->
                                <i  class="option-checked" :style="{width:opt===`opt${questionItem.answer}` ||opt===`opt${questionItem.rightOpt}` ?'100%':'0'}" ></i>
                            </div>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <a  class="qhht-blockButton answer-btn-next" @click="handlePopupHide('reviewShow')">
                关闭回顾
            </a>
        </van-popup>
        <van-popup  v-model="settlementShow" position="bottom" class="settlement-container" @click="handlePopupHide('settlementShow')">
            <div class="settlement-wrapper">
                <div v-show="cvsRenderLoading" class="loading-wrapper">
                    <van-loading />
                    <p>正在生成分享图片</p>
                </div>
                <div v-show="!cvsRenderLoading">
                    <img class="share-img"  :src="shareImg" alt="">
                    <a class="qhht-blockButton share-img_close" @click="handlePopupHide('settlementShow')">关闭分享</a>
                </div>
            </div>
            <div class="settlement-canvas" ref="settlement">
                <div class="settlement-title">成绩单</div>
                <hr class="settlement-title-underline">
                <strong class="answer-name">
                   {{nickName}}同学，你在
                </strong>
                <p>《{{title}}》</p>
                <p>课程自测中获得</p>
                <strong class="settlement-grade">
                    {{grade}}
                </strong>
                <p>请继续加油</p>
                <hr class="settlement-dashed-underline">
                <qr-code  class="settlement-qr" :text="qrCode" error-level="Q" />
                <p>分享二维码，邀请好友一起试听</p>
            </div>
        </van-popup>
    </div>
</template>

<script>
import html2canvas from 'html2canvas'
import { createNamespacedHelpers } from 'vuex'
import { mapActions as mapMainActions } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'videoCourseDetailData/questionListData'
)
let timeInter = ''
export default {
  name: 'QuestionList',
  data: function() {
    return {
      lockIcon: require('../../assets/images/onlinecourse_lock.jpg'), //未解锁
      deblockIcon: require('../../assets/images/onlinecourse_unlock.jpg'), //已解锁
      opts: ['optA', 'optB', 'optC', 'optD'],
      // 变量
      warnClass: '',
      reviewShow: false,
      questionShow: false,
      settlementShow: false,
      shareImg: null,
      nickName: null,
      qrCode: window.location.href,
      qrCodeWidth: window.innerWidth * 0.2,
      cvsRenderLoading: false
    }
  },
  computed: {
    ...mapState([
      'questionIndex',
      'answers',
      'loading',
      'answersChecked'
      // 'newGrade'
    ]),
    ...mapGetters([
      'questionList',
      'questionLength',
      'correct',
      'deblockTime',
      'progress',
      'deblock',
      'questionInfo',
      'grade',
      'title'
    ])
  },
  methods: {
    ...mapMainActions(['wxChooseImage']),
    ...mapActions(['renderAnswers', 'handleNext', 'uploadAnswer']),
    async openQuestionAnswer() {
      if (!this.answersChecked) {
        await this.renderAnswers()
      }
      const questionListLen = await this.questionList.length
      if (!questionListLen) {
        return
      }
      if (this.questionIndex === questionListLen) {
        this.handlePopupShow('settlementShow')
      } else {
        this.handlePopupShow('questionShow')
      }
    },
    async handlePopupShow(popup) {
      const array = ['reviewShow', 'questionShow', 'settlementShow']
      array.forEach(item => {
        this[item] = popup === item
      })
      if (popup === 'settlementShow' && !this.shareImg) {
        this.cvsRenderLoading = true
        const response = await this.$store.dispatch('getUserInfo')
        if (!response) {
          this.cvsRenderLoading = false
          this.handlePopupHide('settlementShow')
          this.$toast('分享图片获取失败')
          return
        }
        const { nickName } = await response
        this.nickName = await nickName
        setTimeout(() => {
          html2canvas(this.$refs.settlement, {
            backgroundColor: '#4C4C4C',
            allowTaint: true,
            width: window.innerWidth,
            height: window.innerHeight,
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0
          }).then(canvas => {
            const image = new Image()
            const canvasImg = canvas.toDataURL('image/png')
              image.src = canvasImg
            image.onload = () => {
              this.shareImg = canvasImg
              this.cvsRenderLoading = false
            }
          })
        }, 300)
      }
    },
    handlePopupHide(popup) {
      this[popup] = false
    },
    handleNextClick() {
      const { questionIndex, questionList, questionInfo } = this
      const { userSelect } = questionInfo
      if (!userSelect) {
        clearTimeout(timeInter)
        this.warnClass = 'shake'
        return (timeInter = setTimeout(() => {
          this.warnClass = ''
        }, 1200))
      }
      const nextIndex = questionIndex + 1
      if (nextIndex + 1 > questionList.length) {
        this.handlePopupHide('questionShow')
        this.handlePopupShow('settlementShow')
      } else {
        this.handleNext({ nextIndex })
      }
    },
    handleAnswerClick(answer) {
      if (this.questionList[this.questionIndex].answer)
        return this.$toast('您已经回答过此问题')
      const { lessonId } = this.$route.params
      this.uploadAnswer({
        lessonId,
        answer
      }).then(() => {
        this.$emit('update', { lessonId })
      })
    }
  }
}
</script>

<style scoped lang="less">
@active: #ffa32f;
.question-container {
  text-align: center;
  margin: 48px auto;
}
.questions-state {
  display: block;
  margin: 0 auto;
  width: 298px;
  height: 252px;
}
.questions-length {
  margin: 30px auto 56px;

  color: #666;
}
.questions-footer-text {
  font-size: 30px;
  font-weight: 700;
  color: #333;
  margin-top: 30px;
}
.question-btn {
  width: 600px;
}
/*回顾自测题*/

.question-to-review-item {
  border-right: 1px solid lightgray;
  flex-grow: 1;
  margin-bottom: 56px;

  color: #6b6363;
  &:last-child {
    border: none;
  }
  p {
    font-size: 36px;
    color: @active;
  }
}
.question-inner-btn {
  width: 240px;
  line-height: 80px;
  background-color: white;
  color: @active;
  border: 2px solid @active;
}
/*回答问题*/
.answer-container {
  width: 80%;
  margin: 0 10%;
  border-radius: 8px;
  font-size: 28px;
  overflow: hidden;
  background: #fff;
}
.answer-wrapper {
  padding: 40px 30px 52px;
}
.answer-btn-close {
  text-align: right;
  a {
    color: #333;
  }
}
.answer-title {
  color: @active;
  font-size: 46px;
  text-align: center;
  letter-spacing: 2px;
  font-weight: lighter;
  margin-bottom: 40px;
}
.answer-content {
  padding: 0 18px 56px;
  text-align: center;
}
.answern-btn-option {
  position: relative;
  height: 94px;
  overflow: hidden;
  margin-bottom: 30px;
  padding: 0 52px 0;
  border-radius: 94px;
  border: 2px solid @active;
  color: #262626;
  transition: border 0.4s linear;
  /*<!--box-shadow: 0 0 6px 2px @active;-->*/
}
.option-checked {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  transition: width 0.3s cubic-bezier(0.68, 0.9, 0.72, 1.12);
  z-index: -1;
}
.hasSelect-answer {
  .question-btn-option {
    border-color: #edf0f7;
  }
  .option-checked {
    background-color: #edf0f7;
  }
  .error-anwser {
    border-color: #ed6c67;
    .option-checked {
      background-color: #ed6c67;
    }
  }
  .correct-anwser {
    border-color: #76c282;
    .option-checked {
      background-color: #76c282;
    }
  }
}
.answer-checked-percent {
  position: absolute;
  right: 18px;
  line-height: 94px;
  color: #b3b3b3;
}
.answer-footer {
  padding-top: 10px;
  color: #a6a6a6;
}
.answer-btn-next {
  height: 94px;
  line-height: 94px;
  border-radius: 0;
}
.settlement-container {
  width: 100%;
  height: 100%;
  background: transparent;
  font-size: 28px;
  letter-spacing: 2px;
  .answer-btn-next {
    position: absolute;
    font-size: 32px;
    font-weight: 600;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
.settlement-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000;
  z-index: 10;
}
.share-img {
  width: 100%;
}
.share-img_close {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-radius: 0;
}
.settlement-canvas {
  position: absolute;
  top: 46%;
  left: 50%;
  width: 702px;
  transform: translate(-50%, -50%);
  /*border-radius: 8px;*/
  padding: 20px 32px 60px;
  background-color: #fff;
  text-align: center;
  color: #818181;
}
.settlement-title {
  margin-top: 56px;
  font-size: 90px;
  font-weight: 600;
  color: #8297ea;
}
.settlement-title-underline {
  position: relative;
  width: 400px;
  margin: 0 auto 32px;
  height: 6px;
  border: none;
  background-color: #8297ea;
  &:after {
    content: '';
    display: block;
    width: 100%;
    padding-top: 8px;
    border-bottom: 2px solid #8297ea;
  }
}
.answer-name {
  font-size: 32px;
  color: #808080;
  & + p {
    margin: 20px auto 16px;
  }
}
.settlement-grade {
  display: inline-block;
  margin: 24px 0;
  font-size: 60px;
  color: @active;
}
.settlement-dashed-underline {
  width: 504px;
  margin: 48px auto 52px;
  border: none;
  border-bottom: 1px dashed #8297ea;
}
.settlement-qr {
  display: block;
  margin: 0 auto 32px;
  width: 200px;
  height: 200px;
  background-color: #c8d3ff;
  /deep/ img {
    width: 100%;
  }
}
.loading-wrapper {
  margin: 47% auto 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 6;
  color: #d6d6d6;
}
/*回顾自测题*/
.review-swipe {
  .hasSelect-answer {
    padding: 0 18px;
  }
}
</style>
