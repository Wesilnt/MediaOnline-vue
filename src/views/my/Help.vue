<template>
    <div class="help">
        <textarea :value="content" @input="updateContent" class="textarea-content" rows="8" placeholder="请填写您的意见和建议"/>
            <button v-bind:class="['help-button-submit',hasValue ? 'button-submit-normal':'button-submit-disable']" @click="handleFeedback">提交反馈</button>
        <div class="div-text-desc">紧急问题可以通过以下方式联系我们：</div>
        <div class="div-text-mail">
            <div class="div-mail-label">邮箱：</div>
            qhht@con.shbaoyuantech.com
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
  mapState,
  mapActions,
  mapMutations,
  mapGetters
} = createNamespacedHelpers('myFeedback')
export default {
  name: 'Help',
  data: function() {
    return {
      inputted: false
    }
  },
  computed: {
    ...mapGetters(['hasValue']),
    ...mapState(['content', 'error', 'loading'])
  },
  methods: {
    ...mapActions(['handleFeedback']),
    ...mapMutations(['updateContent'])
  },
  watch: {
    loading: function(newValue) {
      if (!newValue && this.error.length == 0) {
        alert('您的反馈已提交，谢谢')
      } else if (this.error.length != 0) {
        alert(this.error)
      }
    }
  }
}
</script>

<style scoped>
.help {
  padding: 40px 20px 0;
  font-size: 28px;
}
.textarea-content {
  width: 100%;
  height: 400px;
  padding: 40px;
  background: #f7f7f7;
  color: #333333;
  border-radius: 12px;
  border: 1px solid #ededed;
  -webkit-appearance: none;
}
.help-button-submit {
  display: block;
  width: 640px;
  height: 80px;
  margin: 118px auto 80px;
  text-align: center;
  border-radius: 50px;
  border: 1px solid #d4d3d7;
  background: #fbfcfc;
  color: #b5b5b5;
  pointer-events: none;
}
.button-submit-normal {
  background: #ffa32f;
  color: white;
  border: none;
}
.div-text-desc {
  width: 100%;
  padding: 80px 55px 32px 55px;
  float: left;
  color: #3f4651;
}
.div-text-mail {
  width: 100%;
  padding: 32px 55px 0;
  color: #ffa32f;
}
.div-mail-label {
  font-size: 28px;
  float: left;
  color: #acacb4;
}
</style>
