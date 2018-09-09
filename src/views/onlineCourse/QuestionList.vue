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
                <p class="question-content">{{currentQueston.question}}</p>
                <ol>
                    <li v-for="opt in opts" :key="opt">
                        <a  class="qhht-flex question-btn-option">{{currentQueston[`opt${opt}`]}}</a>
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
      show: true,
      opts: ['A', 'B', 'C', 'D']
    }
  },
  created() {
    this.queryList({ currentType: this.currentType })
  },
  computed: {
    ...mapState(['questionList', 'questionIndex', 'loading']),
    ...mapGetters(['currentQueston', 'questionInfo'])
  },
  methods: {
    ...mapActions(['queryList', 'handleNextClick']),
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
  height: 94px;
  margin-bottom: 30px;
  padding: 0 18px 0 52px;
  border-radius: 94px;
  border: 2px solid @active;
  color: #262626;
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
