<template>
    <section>
        <p class="userinfo-title">{{isInputPhone ? '欢迎使用秦汉胡同' : '验证码已发送'}} </p>
        <div class="userinfo-phone">
            <div v-if="isInputPhone" class="userinfo-phone-input-container">
                <input class="userinfo-phone-input-container-phone" v-model="mobileNumber" type="number" name="points" maxlength="11" placeholder="请输入手机号"/>
            </div>
            <div v-if="!isInputPhone" class="userinfo-phone-code-container">
                <div class="userinfo-phone-code-container-content">
                    <p class="userinfo-phone-code-container-content-text">{{ mobileNumber }}</p>
                    <p  v-if="!showGetValidCode" class="userinfo-phone-code-container-content-countdown">({{ countDownNumber }}秒)</p>
                    <p v-if="showGetValidCode" class="userinfo-phone-code-container-content-getValidCode" @click="getValidCode">获取验证码</p>
                </div>

                <div class="v-code">
                    <input
                            ref="vcode"
                            id="vcode"
                            type="tel"
                            maxlength="6"
                            v-model="validCode"
                            @focus="focused = true"
                            @blur="focused = false"
                            :disabled="telDisabled">

                    <label
                            for="vcode"
                            class="line"
                            :key="index"
                            v-for="(item,index) in codeLength"
                            :class="{'animated': focused && cursorIndex === index}"
                            v-text="codeArr[index]"
                    >
                    </label>
                </div>
            </div>
        </div>

        <div class="userinfo-submit-area">
            <button class="userinfo-submit-area-button-submit" :disabled="!isClickable"
                    :class="{'userinfo-submit-area-button-submit-canclick':isClickable}" @click="handleNext">
                下一步
            </button>

        </div>

    </section>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { isPhoneNumber } from "../../utils/utils";

  const { mapState, mapActions } = createNamespacedHelpers('mobileData')
  export default {
    name: 'EditUserPhone',
    data: function () {
      return {
        isInputPhone:true,
        countDownNumber: 60,
        validCode: '',
        showGetValidCode: false,
        mobileNumber: '',
        validateCode: '',
        codeLength: 6,
        telDisabled: false,
        focused: false,
        isClickable:false
      }
    },
    computed: {
      ...mapState(['remainTime', 'clickable', 'sending', 'validate']),
      codeArr() {
        if(this.isInputPhone === false && this.validCode.length > 0) {
          this.isClickable = true;
        } else {
          this.isClickable = false;
        }
        return this.validCode.split('')
      },
      cursorIndex() {
        return this.validCode.length
      }
    },
    watch: {
      validate(newVal) {
        if(this.validate === true) {
          this.$router.push({ path: './EditUserInfo' })
        }
      },
      mobileNumber(newVal){
        if(this.isInputPhone === true && this.mobileNumber.length > 0) {
          this.isClickable = true;
        } else {
          this.isClickable = false;
        }
      }
    },
    methods: {
      ...mapActions(['init', 'directSendMobileCode', 'validateMobileCode']),
      sendCode() {
        if(this.mobileNumber === ''){
          this.$toast('请输入手机号码')
          return
        }
        if (!isPhoneNumber(this.mobileNumber)) {
          this.$toast('请输入正确的手机号码')
          return
        }
        this.isInputPhone = false
        this.isClickable = false
        this.directSendMobileCode({mobileNo: this.mobileNumber})
        this.countDown()
      },
      onConfirm() {
        if (this.validCode === '') {
          this.$toast('请输入正确的验证码')
          return
        }
        this.validateMobileCode({ code: this.validCode })
      },
      getValidCode() {
        this.showGetValidCode = false
        this.countDownNumber = 60
        this.sendCode()
      },
      handleNext: function () {
        if(this.isInputPhone === true) {
          this.sendCode()
        } else {
          this.onConfirm()
        }
      },
      countDown:function () {
        let num = 60
        let that = this
        clearInterval(timer)
        let timer = setInterval(function() {
          num--
          that.countDownNumber = num
          if (num === 0) {
            clearInterval(timer)
            that.showGetValidCode = true
          }
        }, 1000)
      }
    }
  }
</script>
<style lang="less" scoped>
    .userinfo {
        &-title {
            padding: 104px 0px 60px 60px;
            font-size: 54px;
            color: #ffa32f;
        }
        &-phone {
            font-size: 28px;

            &-sub-title {
                padding: 0px 0px 32px 60px;
                font-size: 28px;
                color: #a3a8b6;
            }
            &-input-container {
                padding: 40px 60px 50px 60px;
                &-phone {
                    width: 100%;
                    height: 80px;
                    text-align:center;
                    vertical-align:middle;
                    letter-spacing: 3px;
                    border-top: white;
                    border-left: white;
                    border-right: white;
                    border-bottom-color: #ffa32f;
                    border-bottom-width: 1px;
                    font-size: 36px;
                    border-radius: 0px;
                }
                &-text{
                    font-size: 36px;
                    padding: 0px 0px 80px 0px;
                    letter-spacing: 3px;
                }
                &-phone-text{
                    font-size: 36px;
                    padding: 0px 0px 80px 0px;
                    letter-spacing: 3px;
                }
            }
            &-code-container {
                padding: 40px 60px 50px 60px;
                &-content{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding-bottom: 80px;
                    &-text {
                        height: 80px;
                        letter-spacing: 3px;
                        font-size: 36px;
                    }
                    &-countdown{
                        font-size: 36px;
                        padding-right: 80px;
                        color: #ced4da;
                    }
                    &-getValidCode{
                        font-size: 28px;
                        padding-right: 0px;
                        color: #ffa32f;
                        font-weight: bold;
                    }
                }
            }
        }
        &-submit-area {
            margin: 72px 55px 0;
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
        }
    }
    .v-code {
        margin-top: 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: relative;
        width:70%;
        margin-left: auto;
        margin-right: auto;
    }
    .v-code input {
        position: absolute;
        top: -100%;
        left: -666666px;
        opacity: 0;
    }
    .v-code .line {
        position: relative;
        width: 64px;
        height: 80px;
        line-height: 32px;
        text-align: center;
        font-size: 80px;
    }
    .v-code .line::after {
        display: block;
        position: absolute;
        content: '';
        left: 0;
        width: 100%;
        bottom: 0;
        height: 5px;
        background-color: #ffa32f;
        transform: scaleY(.5);
        transform-origin: 0 100%;
    }
    .v-code .line.animated::before {
        display: block;
        position: absolute;
        left: 50%;
        top: 20%;
        width: 1px;
        height: 60%;
        content: '';
        background-color: #333333;
        animation-name: coruscate;
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
    }

    @keyframes coruscate {
        0% {
            opacity: 0
        }
        25% {
            opacity: 0
        }
        50% {
            opacity: 1
        }
        75% {
            opacity: 1
        }
        to {
            opacity: 0
        }
    }
</style>
