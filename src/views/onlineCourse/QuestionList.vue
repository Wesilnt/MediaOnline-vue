<template>
    <div>
        <van-button type="warning" @click="handlePopupShow" class="qhht-fullWidth">答问</van-button>
        <van-popup v-model="show" position="right" >
            <div class="question-wrapper">
                <div  class="question-btn-close">
                    <a @click="handlePopupHide">关闭</a>
                </div>

                <p class="question-title">
                    请回答
                </p>
                <p class="question-content">{{currentQuestion.question}}</p>
                <ol class="animated"  :class="warnClass">
                    <li v-for="opt in opts" :key="opt" :class="{
                    'hasSelect-answer':answers[currentQuestion.id]
                    }">
                        <a
                            @click="handleAnswerClick({answer:opt})"
                            class="qhht-flex question-btn-option"
                            :class="[
                                {
                                    'option-selected':answers[currentQuestion.id]===opt,
                                    'error-anwser':answers[currentQuestion.id]===opt&&answers[currentQuestion.id]!==currentQuestion.rightOpt,
                                    'correct-anwser':opt===`opt${currentQuestion.rightOpt}`
                                }
                            ]"
                        >
                            <span>{{currentQuestion[opt]}}</span>
                            <span class="question-checked-percent">{{answers[currentQuestion.id]?currentQuestion[`${opt}Pct`]+'%':''}}</span>
                            <i class="option-checked" :style="{width:answers[currentQuestion.id]?currentQuestion[`${opt}Pct`]+'%':'0'}" ></i>
                        </a>

                    </li>
                </ol>
                <div class="qhht-flex question-footer">
                    <span class="question-footer-left">{{questionInfo.footerBadge}}</span>
                    <span class="question-footer-right">30分</span>
                </div>
            </div>

            <a  class="question-btn-next" @click="handleNextClick">
                {{questionInfo.nextBtnText}}
            </a>
        </van-popup>
    </div>

</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'questionList'
)

export default {
  name: 'QuestionList',
  data: function() {
    return {
      show: false,
      opts: ['optA', 'optB', 'optC', 'optD']
    }
  },
  created() {
    this.queryList({ currentType: null })
  },
  computed: {
    ...mapState([
      'questionList',
      'questionIndex',
      'answers',
      'warnClass',
      'loading'
    ]),
    ...mapGetters(['currentQuestion', 'questionInfo'])
  },
  methods: {
    ...mapActions(['queryList', 'handleAnswerClick', 'handleNextClick']),
    handlePopupShow() {
      this.show = true
    },
    handlePopupHide() {
      this.show = false
    }
  },
  components: {
    // Badge
  }
}
</script>

<style scoped lang="less">
@active: #ffa32f;
.van-popup {
  width: 80%;
  margin: 0 10%;
  border-radius: 4px;
  font-size: 14px;
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
  /*<!--box-shadow: 0 0 6px 2px @active;-->*/
}
.option-checked {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  transition: width 0.6s linear;
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
.question-checked-percent{
    position: absolute;
    right: 18px;
    line-height: 94px;
    color:#B3B3B3;
}
.question-footer {
  padding-top: 10px;
  &-left {
    color: #a6a6a6;
  }
  &-right {
    font-size: 32px;
    color: @active;
  }
}
.question-btn-next {
  display: block;
  height: 94px;
  text-align: center;
  line-height: 94px;
  background-color: @active;
  color: #fff;
}
</style>
