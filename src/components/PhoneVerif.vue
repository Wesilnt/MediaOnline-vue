<template>
  <div class="mobile-validate">
    <div class="validate-container">
      <div class="number-container">
        <p>手机号:</p>
        <input v-model="mobileNumber" placeholder="手机号" type="number">
      </div>
      <div class="code-container">
        <p>验证码:</p>
        <input v-model="validateCode" type="text" placeholder="验证码">
        <a @click.prevent="sendCode">{{remainTime}} <van-loading v-show="sending"/></a>
      </div>
      <a class="validate-confirm" @click.prevent="onConfirm">确认</a>
    </div>

  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('mobile')
export default {
  data() {
    return {
      mobileNumber: '',
      validateCode: ''
    }
  },
  computed: {
    ...mapState(['remainTime', 'clickable', 'sending', 'validate'])
  },
  created() {},
  watch: {
    validate: function(res) {
      if (res) this.$emit('callback')
    }
  },
  methods: {
    ...mapActions(['init', 'sendMobileCode', 'validateMobileCode']),
    sendCode() {
      if (!this.clickable) return
      if (this.mobileNumber === '') {
        this.$toast('请输入手机号')
        return
      }
      this.sendMobileCode({ mobileNo: this.mobileNumber })
    },
    onConfirm() {
      if (this.validateCode === '') {
        this.$toast('请输入正确的验证码')
        return
      }
      this.validateMobileCode({ code: this.validateCode })
    }
  }
}
</script>
<style lang="scss" scoped>
.mobile-validate {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 100;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
}
.validate-container {
  height: 470px;
  width: 670px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
}
.number-container {
  display: flex;
  flex-direction: row;
  margin: 80px 40px 0;
  p {
    color: rgb(28, 28, 28);
    font-size: 30px;
    line-height: 30px;
    align-self: flex-end;
    border-bottom: 1px solid #00000000; /*no*/
  }
  input {
    margin-left: 24px;
    color: rgb(28, 28, 28);
    font-size: 30px;
    width: 250px;
    line-height: 30px;
    border: none;
    border-bottom: 1px solid rgb(204, 204, 204); /*no*/
    outline: none;
  }
}
.code-container {
  display: flex;
  flex-direction: row;
  margin: 64px 40px 0;
  p {
    color: rgb(28, 28, 28);
    font-size: 30px;
    align-self: flex-end;
    line-height: 30px;
    border-bottom: 1px solid #00000000;
  }
  input {
    border: none;
    margin-left: 24px;
    align-self: flex-end;
    color: rgb(28, 28, 28);
    font-size: 30px;
    width: 0px;
    flex: 1;
    outline: none;
    line-height: 30px;
    border-bottom: 1px solid rgb(204, 204, 204); /*no*/
  }
  a {
    border: 1px solid rgb(0, 0, 0); /*no*/
    width: 218px;
    height: 88px;
    color: black;
    text-align: center;
    line-height: 88px;
    font-size: 28px;
    border-radius: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.validate-confirm {
  margin: 67px 40px 0;
  color: white;
  border-radius: 90px;
  text-align: center;
  line-height: 90px;
  font-size: 34px;
  height: 90px;
  background-color: rgb(255, 163, 47);
}
</style>
