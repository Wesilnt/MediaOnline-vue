<template>
    <div class="feedback-container">
        <textarea :value="content" @input="handleInput" class="feedback-textarea-content" rows="8" placeholder="请填写您的意见和建议"/>
        <div class="feedback-warning">
            <p class="feedback-warning-content-length">{{contentLength}}/200</p>
            <button class="feedback-warning-button-submit" :disabled="contentLength===0 || contentLength>=200"
                    :class="{'feedback-warning-button-submit-canclick':contentLength>0 && contentLength<200}" @click="handleFeedback">
                提交反馈
            </button>
            <p class="feedback-warning-text-desc">紧急问题可以通过以下方式联系我们：</p>
            <p class="feedback-warning-text-mail">
                <span class="feedback-warning-mail-label">邮箱：</span>
                qhht@con.shbaoyuantech.com
            </p>
        </div>

    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'myFeedbackData'
)
export default {
  name: 'Feedback',
  data: function() {
    return {
      inputted: false
    }
  },
  computed: {
    ...mapGetters(['contentLength']),
    ...mapState(['content', 'loading', 'posted'])
  },
  methods: {
    ...mapActions(['handleFeedback', 'handleInput'])
  }
}
</script>

<style scoped lang="less">
.feedback {
  &-container {
    padding: 40px 20px 0;
    font-size: 28px;
  }
  &-textarea-content {
    width: 100%;
    min-height: 320px;
    padding: 40px;
    background: #f7f7f7;
    color: #333333;
    border-radius: 12px;
    border: 1px solid #ededed;
    -webkit-appearance: none;
  }
  &-warning {
    padding: 72px 55px 48px;
    &-content-length {
      color: #acacb4;
      text-align: right;
    }
    &-button-submit {
      display: block;
      width: 100%;
      height: 80px;
      margin: 24px auto 80px;
      text-align: center;
      border-radius: 50px;
      border: 1px solid #d4d3d7;
      background: #fbfcfc;
      color: #b5b5b5;
      pointer-events: none;
      outline: none;
      transition: background, color, border, box-shadow 0.4s linear;
    }
    &-button-submit-canclick {
      background: #ffa32f;
      color: white;
      border: none;
      box-shadow: 0 0 10px #ffaa3f;
      pointer-events: auto;
    }
    &-text-desc {
      color: #3f4651;
      margin-bottom: 32px;
    }
    &-text-mail {
      color: #ffa32f;
    }
    &-mail-label {
      color: #acacb4;
    }
  }
}
</style>
