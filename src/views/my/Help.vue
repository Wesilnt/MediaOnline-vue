<template>
    <div class="help">
        <div>
            <textarea :value="content" @input="updateContent" class="textarea-content" rows="8" placeholder="请填写您的意见和建议"/>
            <div class="div-button-submit">
                <button v-bind:class="[hasValue ? 'button-submit-normal':'button-submit-disable']" @click="handleFeedback">提交反馈</button>
            </div>
            <div class="div-text-desc">紧急问题可以通过以下方式联系我们：</div>
            <div class="div-text-mail">
                <div class="div-mail-label">邮箱：</div>
                qhht@con.shbaoyuantech.com
            </div>
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
  padding: 40px 20px 0px 20px;
}
.textarea-content {
  width: 100%;
  height: 400px;
  padding: 40px;
  background: #f7f7f7;
  color: #333333;
  font-size: 28px;
  border-color: #b5b5b5;
  border-radius: 30px;
  border-width: 1px;
  -webkit-appearance: none;
}
.div-button-submit {
  padding: 100px 55px 0px 55px;
}
.button-submit-disable {
  width: 100%;
  height: 80px;
  background: #f7f7f7;
  color: #b5b5b5;
  border-radius: 50px;
  border-color: #b5b5b5;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 28px;
  border-width: 1px;
}
.button-submit-normal {
  width: 100%;
  height: 80px;
  background: #ffa32f;
  color: white;
  border-radius: 50px;
  border-color: #b5b5b5;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 28px;
  border-width: 1px;
}
.div-text-desc {
  width: 100%;
  padding: 80px 55px 32px 55px;
  color: black;
  font-size: 28px;
  float: left;
  color: #3f4651;
  font-size: 28px;
}
.div-text-mail {
  width: 100%;
  padding: 32px 55px 0px 55px;
  color: #ffa32f;
  font-size: 28px;
}
.div-mail-label {
  color: black;
  font-size: 28px;
  float: left;
  color: rgb(172, 172, 180);
  font-size: 28px;
}
</style>
