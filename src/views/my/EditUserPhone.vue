<template>
    <section>
        <p class="userinfo-title">欢迎使用秦汉胡同 </p>
        <div class="userinfo-phone">
            <div class="userinfo-phone-container">
                <input class="userinfo-phone-container-input-phone" v-model="mobileNumber" type="number" name="points" maxlength="11" placeholder="请输入手机号"/>
            </div>
            <div class="userinfo-phone-container">
              <p>{{ mobileNumber }}</p>
                <div class="v-code">
                    <input
                            ref="vcode"
                            id="vcode"
                            type="tel"
                            maxlength="6"
                            v-model="code"
                            @focus="focused = true"
                            @blur="focused = false"
                            :disabled="telDisabled">

                    <label
                            for="vcode"
                            class="line"
                            v-for="item,index in codeLength"
                            :class="{'animated': focused && cursorIndex === index}"
                            v-text="codeArr[index]"
                    >
                    </label>
                </div>
            </div>
        </div>

        <div class="userinfo-submit-area">
            <button class="userinfo-submit-area-button" @click="handleNext">
                下一步
            </button>

        </div>

    </section>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapState, mapActions } = createNamespacedHelpers('mobile')
  export default {
    name: 'EditUserPhone',
    data: function () {
      return {
        phone: '',
        validCode: '',
        mobileNumber: '',
        validateCode: '',
        code: '',
        codeLength: 6,
        telDisabled: false,
        focused: false
      }
    },
    computed: {
      ...mapState(['remainTime', 'clickable', 'sending', 'validate']),
      codeArr() {
        return this.code.split('')
      },
      cursorIndex() {
        return this.code.length
      }
    },
    watch: {
      code(newVal) {
        this.code = newVal.replace(/[^\d]/g,'')
        if (newVal.length > 5) {
          // this.telDisabled = true
          this.$refs.vcode.blur()
          setTimeout(() => {
            alert(`vcode: ${this.code}`)
          }, 500)
        }
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
        this.sendMobileCode({mobileNo: this.mobileNumber})
      },
      handleNext: function () {
        this.sendCode()
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
            &-container {
                display: flex;
                flex-direction: row;
                padding: 140px 60px 50px 60px;
                &-input-phone {
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
                }
            }
        }
        &-submit-area {
            margin: 72px 55px 0;
            &-button {
                width: 100%;
                height: 90px;
                margin: 24px auto 80px;
                font-size: 32px;
                display: block;
                text-align: center;
                border-radius: 50px;
                border: 1px solid #d4d3d7;
                color: #b5b5b5;
                outline: none;
                background: #ffa32f;
                color: white;
                border: none;
                box-shadow: 0 0 10px #ffaa3f;
                transition: background, color, border, box-shadow 0.4s linear;
            }
        }
    }
    .v-code input {
        position: absolute;
        top: -100%;
        left: -666666px;
        opacity: 0;
    }
    .v-code .line {
        position: relative;
        width: 40px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 28px;
    }
    .v-code .line::after {
        display: block;
        position: absolute;
        content: '';
        left: 0;
        width: 100%;
        bottom: 0;
        height: 1px;
        background-color: #aaaaaa;
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
    /*.v-code .line.animated::before {
      display: block;
      content: '';
      position: absolute;
      left: 0;
      bottom: -1px;
      width: 100%;
      height: 2px;
      background-color: #000000;
    }*/
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
