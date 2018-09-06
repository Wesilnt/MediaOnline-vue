<template>
  <div class="mobile-validate">
    <div class="validate-container">
      <div class="number-container">
        <span>手机号：</span>
        <input placeholder="手机号" type="number" v-model="mobileNumber">
      </div>
      <div class="code-container">
        <span>验证码：</span>
        <input type="text" placeholder="验证码" v-model="validateCode">
        <a href="" @click.prevent="sendCode">发送短信</a>
      </div>
      <a class="validate-confirm" @click.prevent="onConfirm">确认</a>
    </div>

  </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      mobileNumber: '',
      validateCode: ''
    }
  },
  methods: {
    sendCode() {
      if (this.mobileNumber === '') {
        Toast('请输入手机号')
        return
      }
    },
    onConfirm() {
      if (this.validateCode === '') {
        Toast('请输入正确的验证码')
        return
      }
      this.$emit('callback')
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
  height: 235px;
  width: 335;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.number-container {
  display: flex;
  flex-direction: row;
  margin: 80px 40px 0;
  span {
    color: rgb(28, 28, 28);
    font-size: 30px;
    line-height: 30px;
    align-self: flex-end;
  }
  input {
    margin-left: 24px;
    color: rgb(28, 28, 28);
    font-size: 30px;
    width: 205px;
    border: none;
    border-bottom: 1px solid rgb(204, 204, 204); /*no*/
    outline: none;
  }
}
.code-container {
  display: flex;
  flex-direction: row;
  margin: 64px 40px 0;
  span {
    color: rgb(28, 28, 28);
    font-size: 30px;
    align-self: flex-end;
    line-height: 30px;
  }
  input {
    border: none;
    margin-left: 24px;
    align-self: flex-end;
    color: rgb(28, 28, 28);
    font-size: 30px;
    width: 210px;
    outline: none;
    border-bottom: 1px solid rgb(204, 204, 204); /*no*/
  }
  a {
    border: 1px solid rgb(0, 0, 0); /*no*/
    width: 218px;
    height: 88px;
    color: black;
    text-align: center;
    line-height: 88px;
    border-radius: 88px;
  }
}
.validate-confirm {
  margin: 40px;
  color: white;
  border-radius: 90px;
  text-align: center;
  line-height: 90px;
  height: 90px;
  margin-top: 68px;
  margin-bottom: 40px;
  background-color: rgb(255, 163, 47);
}
</style>
