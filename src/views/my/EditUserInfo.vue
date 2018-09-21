<template>
    <section>
        <p class="userinfo-title">填写孩子的资料 </p>
        <div v-if='showIdentity' class="userinfo-identity">
            <p class="userinfo-identity-sub-title">你的身份</p>
            <div class="userinfo-identity-container">
                <van-radio-group v-model="identity">
                <div class="userinfo-identity-container-item">
                    <div class="userinfo-identity-container-item-circle"/>
                    <p class="userinfo-identity-container-item-text">我是家长</p>
                    <van-radio name="1"/>
                </div>
                <div class="userinfo-identity-container-item">
                    <div class="userinfo-identity-container-item-circle"/>
                    <p class="userinfo-identity-container-item-text">我是家长</p>
                    <van-radio name="0"/>
                </div>
                </van-radio-group>
            </div>
        </div>
        <div v-if='showNext' class="userinfo-identity">
            <p class="userinfo-identity-sub-title">{{identity === '1'? '您孩子的性别' : '你的性别'}}</p>
            <div class="userinfo-identity-container">
                <van-radio-group v-model="sex">
                    <div class="userinfo-identity-container-item">
                        <div class="userinfo-identity-container-item-circle"/>
                        <p class="userinfo-identity-container-item-text">我是男生</p>
                        <van-radio name="1"/>
                    </div>
                    <div class="userinfo-identity-container-item">
                        <div class="userinfo-identity-container-item-circle"/>
                        <p class="userinfo-identity-container-item-text">我是女生</p>
                        <van-radio name="0"/>
                    </div>
                </van-radio-group>
            </div>
        </div>
         <div  v-if="showNext" class="userinfo-grade-container">
             <p class="userinfo-identity-sub-title">{{identity === '1'? '您孩子的年级' : '你的年级'}}</p>
            <van-picker :columns="columns" @change="onChange"  />
         </div>
        <div class="userinfo-submit-area">
            <button class="userinfo-submit-area-button" @click="handleNext">
                {{showNext === true? '确认' : '下一步'}}
            </button>
            <p v-if="showNext" class="userinfo-submit-area-agreement-label">
                <span class="userinfo-submit-area-agreement-text">点击按钮即表示同意</span>
                《秦汉胡同使用协议》
            </p>
        </div>

    </section>
</template>

<script>
  import { Toast } from 'vant';
  export default {
    name: "EditUserInfo",
    data: function () {
      return {
        identity: '',
        sex:'',
        grade:'',
        showIdentity: true,
        showNext:false,
        columns: ['未上学', '幼儿园', '一年级', '二年级', '三年级','四年级','五年级','六年级','初一','初二','初三','初三以上']
      }
    },
    methods: {
      handleNext: function () {
        if (this.showNext === false){
          if (this.identity === '') {
            Toast.fail('请先选择身份')
          } else {
            this.showNext = true
            this.showIdentity = false
          }
      } else {
          if (this.sex === '') {
            Toast.fail('请选择性别')
          } else if (this.grade === '') {
            Toast.fail('请选择年级')
          }else if (this.showNext === true) {

          }
        }
      },
      onChange(picker, value, index) {
        console.log(value)
        this.grade = value
      },
    }
  }
</script>

<style lang="less">
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
                display: flex;
                flex-direction: row;
                padding: 0px 45px 198px 45px;
                &-item {
                    display: flex;
                    flex-direction: row;
                    position:relative;
                    width: 300px;
                    height: 200px;
                    padding-bottom: 56px;
                    border: 1px #000;
                    background: #eeeeee;
                    margin: 0px 15px 0px 15px;
                    border-radius: 20px;
                    &-text {
                        line-height: 200px;
                        font-size: 28px;
                        padding: 0px 0px 0px 30px;
                        color: #d2d0d6;
                    }
                    &-circle {
                        width: 120px;
                        height: 120px;
                        margin: 40px 0px 40px 20px;
                        border-radius: 50%;
                        background-color: #ffffee;

                    }
                }
            }
        }
        &-grade-container{
            margin-top: -100px;
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
                text-align: center; //文字居中
            }
            &-agreement-text {
                color: #acacb4;
                padding-bottom: 30px;
            }
        }
    }
    .van-radio-group {
        display: flex;
        flex-direction: row;
    }
    .van-radio {
        width: 40px;
        height: 40px;
        position:absolute;
        right:0px;
        bottom:-25px;

    }
    .van-picker{
        height: 150px;
    }
    .van-picker-column__item {
        width: 100vw

    }
    .van-picker-column{
        overflow: visible;
    }

</style>
