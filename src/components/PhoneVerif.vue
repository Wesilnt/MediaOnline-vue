<template>
  <div class="mobile-validate"  @click.self="hideTeleRegister">
    <div class="validate-container">
      <span class="mobile-close" @click.self="hideTeleRegister">X</span>
      <div class="number-container">
        <p>手机号:</p>
        <input v-model="mobileNumber" placeholder="手机号" type="number">
      </div>
      <span class="number-error-hint">{{numberError}}</span>
      <div class="code-container">
        <p>验证码:</p>
        <input v-model="validateCode" type="text" placeholder="验证码">
        <a @click.prevent="sendCode">{{remainTime}} <van-loading v-show="sending"/></a>
      </div>
      <span class="code-error-hint">{{codeError}}</span>
      <a class="validate-confirm" @click.prevent="onConfirm">确认</a>
    </div>

  </div>
</template>
<script>
import { Toast } from 'vant'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers(
  'mobileData'
)
export default {
  props: ['hideTeleRegister', 'succFun'],
  data() {
    return {
      mobileNumber: '',
      validateCode: '',
      numberError: '',
      codeError: ''
    }
  },
  computed: {
    ...mapState(['remainTime', 'clickAble', 'sending', 'validate'])
  },
  watch: {
    validate: function(res) {
      if (res) this.$emit('callback')
    },
    mobileNumber: function(newNum, oldNum) {
      if (newNum != oldNum) this.numberError = ''
    },
    validateCode: function(newNum, oldNum) {
      if (newNum != oldNum) this.codeError = ''
    }
  },
  methods: {
    ...mapActions(['init', 'sendMobileCode', 'validateMobileCode']),
    sendCode() {
      if (!this.clickable) return
      if (this.mobileNumber.trim() === '') {
        Toast({ position: 'bottom', message: '请输入手机号' })
        this.numberError = '请输入手机号'
        return
      }
      if (!this.isPoneAvailable(this.mobileNumber)) {
        this.$toast({ position: 'bottom', message: '手机号格式不正确' })
        this.numberError = '手机号格式不正确'
        return
      }
      this.sendMobileCode({ mobileNo: this.mobileNumber })
    },
    async onConfirm() {
      if (this.validateCode === '') {
        this.$toast({ position: 'bottom', message: '请输入正确的验证码' })
        this.codeError = '请输入正确的验证码'
        return
      }
      await this.validateMobileCode({ code: this.validateCode })
      this.hideTeleRegister()
      this.succFun()
    },
    isPoneAvailable(str) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(str)) {
        return false
      } else {
        return true
      }
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
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.validate-container {
  position: absolute;
  top: 10%;
  left: 0;
  right: 0;
  width: 670px;
  margin: 0 auto;
  background-color: white;
  border-radius: 12px;
  z-index: 100;
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
.number-error-hint {
  color: red;
  font-size: 28px;
  align-self: flex-start;
  padding-top: 20px;
  margin-left: 40px;
}
.code-container {
  display: flex;
  flex-direction: row;
  margin: 20px 40px 0;
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
    width: 0;
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
.code-error-hint {
  color: red;
  font-size: 28px;
  align-self: flex-start;
  padding-top: 20px;
  margin-left: 40px;
}
.validate-confirm {
  display: block;
  margin: 67px 40px 40px;
  color: white;
  border-radius: 90px;
  text-align: center;
  line-height: 90px;
  font-size: 34px;
  height: 90px;
  background-color: rgb(255, 163, 47);
}
.mobile-close {
  position: absolute;
  padding: 6px 20px;
  top: 16px;
  right: 24px;
  color: #ffbc66;
  font-size: 40px;
  font-weight: bolder;
}

.van-toast {
  z-index: 3000;
  /deep/.van-toast--text {
    z-index: 3000;
  }
}
</style>
