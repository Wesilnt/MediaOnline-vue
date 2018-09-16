<template>
    <div>
      <div @click="openQuestionAnswer">
        <slot>
         <button  class="qhht-blockButton question-btn">开始答题</button>
         </slot>
      </div>
       
        <van-popup v-model="questionShow" position="right" class="question-container" >
            <div class="question-wrapper">
                <div  class="question-btn-close">
                    <a @click="handlePopupHide('questionShow')">关闭</a>
                </div>

                <p class="question-title">
                    {{questionInfo.headerTitle}}
                </p>
                <p class="question-content">{{questionInfo.question}}</p>
                <ol class="animated"  :class="warnClass">
                    <li v-for="opt in opts" :key="opt" :class="{
                    'hasSelect-answer':questionInfo.userSelect
                    }">
                        <a
                            @click="handleAnswerClick(opt)"
                            class="qhht-flex question-btn-option"
                            :class="[
                                {
                                    'option-selected':questionInfo.isCorrect,
                                    'error-anwser':questionInfo.userSelect===opt&&questionInfo.userSelect!==questionInfo.rightOpt,
                                    'correct-anwser':opt===`opt${questionInfo.rightOpt}`
                                }
                            ]"
                        >
                            <span>{{questionInfo[opt]}}</span>
                            <!-- <span class="question-checked-percent">{{questionInfo.userSelect?questionInfo[`${opt}Pct`]+'%':''}}</span> -->
                            <!--<i  class="option-checked" :style="{width:questionInfo.userSelect?questionInfo[`${opt}Pct`]+'%':'0'}" ></i>-->
                            <!-- <span class="question-checked-percent">{{questionInfo.userSelect?questionInfo[`${opt}Pct`]+'%':''}}</span> -->
                            <i  class="option-checked" :style="{width:opt===`opt${!questionInfo.userSelect?0:questionInfo.rightOpt}`?'100%':questionInfo.userSelect===opt?'100%':'0'}" ></i>
                        </a>

                    </li>
                </ol>
                <div class="question-footer">
                    {{questionInfo.footerBadge}}
                </div>
            </div>

            <a  class="qhht-blockButton question-btn-next" @click="handleNextClick">
                {{questionInfo.nextBtnText}}
            </a>
        </van-popup>
        <van-popup v-model="settlementShow" position="bottom" class="settlement-container" @click="handlePopupHide('settlementShow')">
            <div class="settlement-wrapper">
                <div class="settlement-title">成绩单</div>
                <hr class="settlement-title-underline">
                <strong class="answer-name">
                    XXX同学，你在
                </strong>
                <p>《{{title}}》</p>
                <p>课程自测中获得</p>
                <strong class="settlement-grade">
                    {{newGrade?newGrade:grade}}
                </strong>
                <p>请继续加油</p>
                <hr class="settlement-dashed-underline">
                <i class="settlement-qr"></i>
                <p>分享二维码，邀请好友一起试听</p>
            </div>
            <a  class="qhht-blockButton question-btn-next" @click="handlePopupHide('settlementShow')">
                保存图片
            </a>
        </van-popup>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'videoCourseDetail/questionList'
)
let timeInter = ''
export default {
  name: 'QuestionList',
  data: function() {
    return {
      warnClass: '',
      questionShow: false,
      settlementShow: false,
      opts: ['optA', 'optB', 'optC', 'optD']
    }
  },
  computed: {
    ...mapState([
      'questionIndex',
      'answers',
      'loading',
      'answersChecked',
      'newGrade'
    ]),
    ...mapGetters(['questionList', 'questionInfo', 'grade', 'title'])
  },
  methods: {
    ...mapActions([
      'renderAnswers',
      'handleNext',
      'uploadAnswer',
      'resetQuestionList'
    ]),
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
    handlePopupShow(popup) {
      this[popup] = true
    },
    handlePopupHide(popup) {
      this[popup] = false
    },
    handleNextClick() {
      const { questionIndex, questionList, answers, questionInfo } = this
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
        // const answersArr = Object.entries(answers)
        /*const corrects = questionList.reduce((prev, item, index) => {
          const answerItem = answersArr[index]
          if (
            item.id === answerItem[0] &&
            `opt${item.rightOpt}` === answerItem[1]
          ) {
            prev.push(true)
          }
          return prev
        }, [])*/
        this.handlePopupHide('questionShow')
        this.handlePopupShow('settlementShow')
      } else {
        this.handleNext({ nextIndex })
      }
    },
    handleAnswerClick(answer) {
      if (this.questionIndex === Object.keys(this.answers).length && this.userSelect) return
      this.uploadAnswer({
        lessonId: this.$route.params.lessonID,
        answer
      })
    }
  },
  destroyed: function() {
    this.resetQuestionList()
  }
}
</script>

<style scoped lang="less">
@active: #ffa32f;
.question-btn {
  width: 600px;
}
.question-container {
  width: 80%;
  margin: 0 10%;
  border-radius: 8px;
  font-size: 28px;
  overflow: hidden;
}
.question-wrapper {
  padding: 40px 30px 52px;
}
.question-btn-close {
  text-align: right;
  a {
    color: #333;
  }
}
.question-title {
  color: @active;
  font-size: 46px;
  text-align: center;
  letter-spacing: 2px;
  font-weight: lighter;
  margin-bottom: 40px;
}
.question-content {
  padding: 0 18px 56px;
  text-align: center;
}
.question-btn-option {
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
.question-checked-percent {
  position: absolute;
  right: 18px;
  line-height: 94px;
  color: #b3b3b3;
}
.question-footer {
  padding-top: 10px;
  color: #a6a6a6;
}
.question-btn-next {
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
  .question-btn-next {
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
  top: 46%;
  left: 50%;
  width: 702px;
  padding-bottom: 60px;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background-color: #fff;
  text-align: center;
  color: #818181;
}
.settlement-title {
  margin-top: 64px;
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
  width: 152px;
  height: 152px;
  background-color: #20c997;
}
</style>
