<template>
    <section>
        <p class="userinfo-title">填写孩子的资料 </p>
        <div v-if='showIdentity' class="userinfo-identity">
            <p class="userinfo-identity-sub-title">你的身份</p>
            <div class="userinfo-identity-container">
                <van-radio-group v-model="radio">
                    <div class="userinfo-identity-container-item">
                        <div class="userinfo-identity-container-item-content">
                            <div class="userinfo-identity-container-item-content-circle"/>
                            <p class="userinfo-identity-container-item-content-text">我是家长</p>
                        </div>

                        <van-radio name="1"/>
                    </div>
                    <div class="userinfo-identity-container-item">
                        <div class="userinfo-identity-container-item-content">
                            <div class="userinfo-identity-container-item-content-circle"/>
                            <p class="userinfo-identity-container-item-content-text">我是家长</p>
                        </div>
                        <van-radio name="2"/>
                    </div>
                </van-radio-group>
            </div>
        </div>
        <div v-if='showSex' class="userinfo-identity">
            <p class="userinfo-identity-sub-title">你的性别</p>
            <div class="userinfo-identity-container">
                <van-radio-group v-model="radio">
                    <div class="userinfo-identity-container-item">
                        <div class="userinfo-identity-container-item-content">
                            <div class="userinfo-identity-container-item-content-circle"/>
                            <p class="userinfo-identity-container-item-content-text">我是男生</p>
                        </div>

                        <van-radio name="1"/>
                    </div>
                    <div class="userinfo-identity-container-item">
                        <div class="userinfo-identity-container-item-content">
                            <div class="userinfo-identity-container-item-content-circle"/>
                            <p class="userinfo-identity-container-item-content-text">我是女生</p>
                        </div>
                        <van-radio name="2"/>
                    </div>
                </van-radio-group>
            </div>
        </div>
        <div v-if='showGrade' class="userinfo-grade">
            <van-picker :column="columns" @change="onChange" />
        </div>
        <div class="userinfo-submit-area">
            <button class="userinfo-submit-area-button" @click="handleNext">
                下一步
            </button>
            <p class="userinfo-submit-area-agreement-label">
                <span class="userinfo-submit-area-agreement-text">点击按钮即表示同意</span>
                《秦汉胡同使用协议》
            </p>
        </div>

    </section>
</template>

<script>
  export default {
    name: "EditUserInfo",
    data: function () {
      return {
        radio: '',
        showIdentity:true,
        showGrade:true,
        showSex:false,
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州']
      }
    },
    methods: {
      handleNext: function () {
        console.log("Next")
      },
      onChange(picker, value, index) {
        console.log(value + index)
      }
    }
  }
</script>

<style scoped lang="less">
    .userinfo {
        &-title {
            padding: 104px 0px 60px 60px;
            font-size: 54px;
            color: #ffa32f;
        }
        &-identity {
            font-size: 28px;

            &-sub-title {
                padding: 0px 0px 32px 60px;
                font-size: 28px;
                color: #a3a8b6;
            }
            &-container {
                display: grid;
                grid-template-columns: auto;
                padding: 0px 45px 198px 45px;
                &-item {
                    width: 50%;
                    height: 200px;
                    padding-bottom: 56px;
                    border: 1px #000;
                    background: #ced4da;
                    margin: 0px 15px 0px 15px;
                    border-radius: 20px;
                    &-content {
                        display: flex;
                        height: 200px;
                        flex-direction: row;
                        padding-bottom: 100px;
                        align-content: center;
                        &-text {
                            line-height: 200px;
                            font-size: 28px;
                            padding: 0px 0px 0px 30px;
                        }
                        &-circle {
                            width: 120px;
                            height: 120px;
                            line-height: 200px;//文字在块内垂直居中
                            text-align: center;//文字居中
                            border-radius: 50%;
                            background-color: #009966;
                        }
                    }
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

            &-agreement-label {
                color: #ffa32f;
                font-size: 24px;
                text-align: center;//文字居中
            }
            &-agreement-text {
                color: #acacb4;
            }
        }
    }

    .van-radio-group {
        display: flex;
        flex-direction: row;
    }

    .van-radio {
        padding: 0px 0px 0px 120px;
        margin: -15px 0px 0px 0px;

    }
    .van-picker {
        height: 150px;
    }


</style>
