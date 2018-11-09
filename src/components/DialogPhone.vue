<template>
    <dialog ref="dialog" class="dialog-phone" @click.self="onMaskClick">
        <form class="form">
            <fieldset>
                <label class="form-label">手机号:</label>
                <input class="form-input" v-model="number" type="number" placeholder="请输入手机号"/>
                <!--{{remainTime}} <van-loading v-show="sending"/>-->
                <input class="form-button" :class="{'phone-input': number.length>0 && clickAble}" @click="getCode"
                       type="button" :value="getCodeTip"/>
                <br>
            </fieldset>
            <fieldset>
                <label class="form-label"> 验证码:</label>
                <input class="form-input" v-model="code" type="text"/><br>
            </fieldset>
            <input class="form-submit" :class="{'code-input':code.length>0}" type="submit"
                   @click.prevent="onPhoneConfirm" value="确认"/>
        </form>
    </dialog>
</template>

<script>
    import { Toast } from 'vant';
    import { createNamespacedHelpers } from 'vuex';

    const { mapState, mapActions } = createNamespacedHelpers('mobileData');
    export default {
        props: {
            value: {
                default: false
            }
        },
        data() {
            return {
                number: '',
                code: ''
            };
        },
        computed: { ...mapState(['getCodeTip', 'clickAble', 'sending', 'validate']) },
        watch: {
            value: {
                handler: 'toggleDialog',
                immediate: true
            }
        },
        methods: {
            ...mapActions(['init', 'sendMobileCode', 'validateMobileCode']),
            toggleDialog(isShow) {
                if (!this.$refs.dialog) return;
                if (isShow) this.$refs.dialog.show();
                if (!isShow) this.$refs.dialog.close();
            },
            //获取验证码
            getCode() {
                if (!this.clickAble) return;
                let phoneNum = this.number.trim();
                if (phoneNum === '') {
                    Toast({ position: 'bottom', message: '请输入手机号' });
                    return;
                }
                if (!this.isPoneAvailable(phoneNum)) {
                    this.$toast({ position: 'bottom', message: '手机号格式不正确' });
                    return;
                }
                this.sendMobileCode({ mobileNo: phoneNum });
            },
            onMaskClick() {
                this.$emit('input', false);
            },
            onPhoneConfirm() {
                let phoneNum = this.number.trim();
                if (phoneNum === '') {
                    Toast({ position: 'bottom', message: '请输入手机号' });
                    return;
                }
                if (this.code === '') {
                    this.$toast({ position: 'bottom', message: '请输入正确的验证码' });
                    return;
                }
                this.validateMobileCode({ code: this.validateCode })
                    .then(isSuccess => {
                        if (isSuccess) {
                            this.$emit('input', false);
                            this.$router.push({ name: 'distributionCenter' });
                        }
                    });
            },
            isPoneAvailable(str) {
                return /^[1][3,4,5,7,8][0-9]{9}$/.test(str);
            }
        }
    };
</script>

<style lang="less" scoped>
    .dialog-phone {
        height: 100vh;
        top: 0;
        bottom: 0;
        left: 0;
        border: 0;
        width: 100%;
        padding: 0;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .form {
        align-self: flex-end;
        padding: 8px 80px 0;
        background-color: #ffffff;
        position: absolute;
        bottom: 0;
        left: 0;
        &-label {
            font-size: 30px;
            color: #3e3e53;
            margin: 72px 20px 32px 0;
        }
        fieldset {
            position: relative;
            display: inline-block;
            flex-direction: row;
            border-bottom: 1px solid #ededed;
            width: 100%;
            align-items: center;
        }
        &-input,
        &-input {
            color: #c3c3c8;
            border: 0;
            font-size: 30px;
        }
        &-button {
            border: 1px solid #ededed; /*no*/
            background-color: #ffffff;
            color: #999999;
            border-radius: 40px;
            position: absolute;
            right: 0;
            bottom: 16px;
            font-size: 24px;
            padding: 18px 23px 16px 22px;
        }
        &-submit {
            font-size: 34px;
            width: 100%;
            border: 1px solid #ededed;
            background-color: #ffffff;
            color: #a3a8b6;
            border-radius: 45px;
            margin: 64px 0 43px;
            line-height: 90px;
        }
        .phone-input {
            border: 1px solid #ffa32f;
            color: #ffa32f;
        }

        .code-input {
            border: 1px solid #ffa32f;
            color: #ffffff;
            background-color: #ffa32f;
        }
    }
</style>